import EventCard from "../components/event/EventCard";
import useApi from "../hooks/useApi";
import type { MyRegistrationsRes } from "../types/types";

function MyRegistrations(){

    const {data} = useApi<MyRegistrationsRes>({
        url:"/registrations",
        method:"GET",
        autoFetch:true,
        successMsg:""
    }); 

    const RegistrationList = data? data as MyRegistrationsRes[]:[];
    return(<div className="flex gap-2 m-3">
    {RegistrationList.map(registeredEvent=> 
    <EventCard key={registeredEvent._id} eventModel={registeredEvent.eventId}/>)}
    </div>)
}

export default MyRegistrations;