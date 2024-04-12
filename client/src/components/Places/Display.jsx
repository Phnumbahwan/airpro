import { Link } from "react-router-dom";

const Display = (props) => {
    const { places } = props;

    return (
        <div>
            {
                places.length > 0 && (
                    places.map((place, index) => (
                        <Link key={index} to={'/account/places/' + place._id}>
                            <div className="flex gap-4 hover:bg-gray-100 p-4 rounded-2xl">
                                <div className="bg-gray-300 w-96">
                                    <img className="rounded w-full h-full" src={place.photos[0] || 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='} />
                                </div>
                                <div className="grow-0 shrink py-2">
                                    <h2 className="text-xl">{place.title}</h2>
                                    <p className="text-sm mt-2">{place.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                )
            }
        </div>
    )
}

export default Display;