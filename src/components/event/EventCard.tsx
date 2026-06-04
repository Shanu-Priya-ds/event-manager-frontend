import { useNavigate } from "react-router-dom";
import type { EventCardProps } from "../../types/types";
import EditDeleteEvent from "./EditDeleteEvent";

function EventCard({eventModel, onEdit, onDeleted}:EventCardProps){
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
       {  onEdit && onDeleted &&
       <EditDeleteEvent onDeleted={onDeleted} onEdit={onEdit} event={eventModel}></EditDeleteEvent> }
    </div>)

}

export default EventCard;