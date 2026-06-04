import { useNavigate } from "react-router-dom";
import type { EventModel } from "../../types/types";

function EventCard({eventModel}:{eventModel:EventModel}){
    const navigate = useNavigate();
    function handlePageRedirect(){
        navigate(`/eventDetails/${eventModel._id}`);
    }
    return(<div>
        <h1>{eventModel.title}</h1>
        <img src={eventModel.imageUrl} onClick={handlePageRedirect}alt="Event image not available"/>
        <p>{eventModel.description}</p>
        <p>{new Date(eventModel.dateTime)?.toISOString()}</p>
        <p>{eventModel.venue}</p>
    </div>)

}

export default EventCard;