import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import type { EventModel } from "../../types/types";
import useApi from "../../hooks/useApi";
import { formatDate } from "../../utils/utils";

function EventForm({event, onClose, onEventSaved}:{event?: EventModel | null, onClose:()=>void, onEventSaved:(eventData:EventModel)=>void}){

    const [formData, setFormData] = useState({
        title:"",
        description:"",
        venue:"",
        dateTime:formatDate(new Date()) //set current date
    })

    const isEditing = !!event;

    const { data, execute } = useApi<EventModel>({
        url: isEditing ? `/events/${event?._id}` : "/events",
        method: isEditing ? "PUT" : "POST",
        autoFetch: false,
        successMsg: isEditing ? "Event updated successfully." : "Event created successfully."
    });

    useEffect(() => {
        if (event) {
            const dateObj = new Date(event.dateTime);
            const formattedDateTime = formatDate(dateObj);
            setFormData({
                title: event.title,
                description: event.description,
                venue: event.venue,
                dateTime: formattedDateTime
            });
        }
    }, [event]);

    useEffect(()=>{
        if(data) {
            onEventSaved?.(data as EventModel);
            onClose();
        }
    },[data]);

    function saveEvent(e:SyntheticEvent){
        e.preventDefault();
        execute(formData);
     }

    function handleFormChange(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} = e.target;
        console.log(name);
        console.log(value);
        setFormData(prev=> ({...prev, [name]:value }));
    }
    return(<div>
        <form onSubmit={saveEvent}>
            <input required type="text" name="title" onChange={handleFormChange} value={formData.title} placeholder="Event Title"/>
         <textarea value={formData.description} name="description" onChange={handleFormChange}  placeholder="Enter event description"></textarea>
         <input required value={formData.venue} name="venue" onChange={handleFormChange}  type="text" placeholder="Venue"/>
         <input required type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleFormChange}/>
         <button type="submit">Save</button>
    </form>
    </div>);
}

export default EventForm;