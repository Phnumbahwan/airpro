import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../components/Places/Form";
import AddButton from "../components/Places/AddButton";
import Display from "../components/Places/Display";

const PlacesPage = () => {
    const [places, setPlaces] = useState([]);
    const { action } = useParams();

    const getPlaces = async () => {
        try {
            await axios.get('/places')
                .then((res) => setPlaces(res.data));
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getPlaces();
    }, [])

    return (
        <div>
            {
                action === undefined && (
                    <div>
                        <AddButton />
                        <Display places={places} />
                    </div>
                )
            }
            {
                action?.length > 0 && (
                    <Form action={action} />
                )
            }
        </div>
    )
}

export default PlacesPage;