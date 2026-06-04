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
    return(<>Event registered
    {RegistrationList.map(registeredEvent=> <EventCard key={registeredEvent._id} eventModel={registeredEvent.eventId}/>)}</>)
}

export default MyRegistrations;