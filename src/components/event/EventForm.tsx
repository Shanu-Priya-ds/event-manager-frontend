import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import type { EventModel } from "../../types/types";
import useApi from "../../hooks/useApi";
import toast from "react-hot-toast";
//import toast from "react-hot-toast/headless";

function EventForm({onClose}:{onClose:()=>void}){
     
    const [formData, setFormData] = useState({
        title:"",
        description:"",
        venue:"",
        dateTime:""
    })
    const { data, error, execute } = useApi<EventModel>({
        url: "/events",
        method: "POST",
        autoFetch: false,
        successMsg:"Event created successfully."
    });

    useEffect(()=>{
        if(data) {
            toast.success("Event Created successfully")
            onClose();

        }
    },[data, onClose]);

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