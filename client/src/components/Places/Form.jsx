import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = ({ action }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const handleAddPhoto = (e) => {
        e.preventDefault();
        setAddedPhotos(prev => [...addedPhotos, photoLink]);
        setPhotoLink('');
    }

    const handlePerksChange = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            setPerks([...perks, name]);
        } else {
            setPerks([...perks.filter((perk) => perk !== name)]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/places', {
            title, address, description, addedPhotos, perks, extraInfo, checkIn, checkOut, maxGuests
        });
        navigate('/account/places');
    }

    const getPlace = async (id) => {
        try {
            await axios.get(`/places/${id}`)
                .then((res) => {
                    const { data } = res;
                    setTitle(data.title);
                    setAddress(data.address);
                    setAddedPhotos(data.photos);
                    setDescription(data.description);
                    setPerks(data.perks);
                    setExtraInfo(data.extraInfo);
                    setCheckIn(data.checkIn);
                    setCheckOut(data.checkOut);
                    setMaxGuests(data.maxGuests);
                });
        } catch (error) {
            throw error;
        }
    }

    const handleRemove = (photo) => {
        setAddedPhotos((prev) => prev.filter((e) => e !== photo))
    }

    useEffect(() => {
        if (action !== 'new' && action?.length > 0) {
            getPlace(action);
        }
    }, [action])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="text-2xl mt-4">Title</h2>
                <p className="text-gray-500 text-sm">Title for your place should be short and catchy as in advertisement</p>
                <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title, for example: My lovely apartment" />

                <h2 className="text-2xl mt-4">Address</h2>
                <p className="text-gray-500 text-sm">Address to this place</p>
                <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Address" />

                <h2 className="text-2xl mt-4">Photo</h2>
                <p className="text-gray-500 text-sm">more = better</p>
                <div className="flex gap-2 ">
                    <input value={photoLink} onChange={(e) => setPhotoLink(e.target.value)} type="text" placeholder="Add using link ... jpg" />
                    <button onClick={(e) => handleAddPhoto(e)} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                </div>
                <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {
                        addedPhotos.length > 0 && addedPhotos.map((photo, index) => (
                            <div key={index} className="relative group">
                                <svg onClick={() => handleRemove(photo)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 absolute right-0 cursor-pointer bg-white rounded-bl-lg p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                <a href={photo} target="_blank">
                                    <img className="rounded-2xl w-72 h-48 m-auto group-hover:shadow-lg transition-shadow" src={photo} />
                                </a>
                            </div>
                        ))
                    }
                    <div className="flex justify-center items-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-500 text-sm">Description of the place</p>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <h2 className="text-2xl mt-4">Perks</h2>
                <p className="text-gray-500 text-sm">Perks of the place</p>
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <label className="border p-4 flex justify-between rounded-2xl gap-2 items-center cursor-pointer">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                            </svg>
                            <span>WIFI</span>
                        </div>
                        <input checked={perks.includes('wifi')} type="checkbox" onChange={handlePerksChange} name="wifi" />
                    </label>
                    <label className="border p-4 flex justify-between rounded-2xl gap-2 items-center cursor-pointer">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                            </svg>
                            <span>Free parking spot</span>
                        </div>
                        <input checked={perks.includes('parking')} type="checkbox" onChange={handlePerksChange} name="parking" />
                    </label>
                    <label className="border p-4 flex justify-between rounded-2xl gap-2 items-center cursor-pointer">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                            <span>TV</span>
                        </div>
                        <input checked={perks.includes('tv')} type="checkbox" onChange={handlePerksChange} name="tv" />
                    </label>
                    <label className="border p-4 flex justify-between rounded-2xl gap-2 items-center cursor-pointer">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                            </svg>
                            <span>Netflix</span>
                        </div>
                        <input checked={perks.includes('netflix')} type="checkbox" onChange={handlePerksChange} name="netflix" />
                    </label>
                    <label className="border p-4 flex justify-between rounded-2xl gap-2 items-center cursor-pointer">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0 1 12 12.75Zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 0 1-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 0 0 2.248-2.354M12 12.75a2.25 2.25 0 0 1-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 0 0-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 0 1 .4-2.253M12 8.25a2.25 2.25 0 0 0-2.248 2.146M12 8.25a2.25 2.25 0 0 1 2.248 2.146M8.683 5a6.032 6.032 0 0 1-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0 1 15.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 0 0-.575-1.752M4.921 6a24.048 24.048 0 0 0-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 0 1-5.223 1.082" />
                            </svg>
                            <span>Pets</span>
                        </div>
                        <input checked={perks.includes('pets')} type="checkbox" onChange={handlePerksChange} name="pets" />
                    </label>
                    <label className="border p-4 flex justify-between rounded-2xl gap-2 items-center cursor-pointer">
                        <div className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                            </svg>
                            <span>Entrance</span>
                        </div>
                        <input checked={perks.includes('entrance')} type="checkbox" onChange={handlePerksChange} name="entrance" />
                    </label>
                </div>

                <h2 className="text-2xl mt-4">Extra info</h2>
                <p className="text-gray-500 text-sm">House rules, etc</p>
                <textarea value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} />

                <h2 className="text-2xl mt-4">Check in&out times</h2>
                <p className="text-gray-500 text-sm">Add check in and out times, remember to have some time window for cleaning the room between guests</p>
                <div className="grid gap-2 grid-cols-3">
                    <div className="mt-2 -mb-1">
                        <h3>Check in time</h3>
                        <input
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            type="number"
                            placeholder="14"
                        />
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>Check out time</h3>
                        <input
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            type="number"
                            placeholder="11"
                        />
                    </div>
                    <div className="mt-2 -mb-1">
                        <h3>Max number of guests</h3>
                        <input
                            value={maxGuests}
                            onChange={(e) => setMaxGuests(e.target.value)}
                            type="number"
                        />
                    </div>
                </div>

                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}

export default Form;