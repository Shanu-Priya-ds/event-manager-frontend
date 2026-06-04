//browse all events (post-login)
//register/cancel events

import EventCard from "../components/event/EventCard";
import useApi from "../hooks/useApi";
import type { EventModel } from "../types/types";

function Home(){

    const{data} = useApi<EventModel>({
        url:"/events/all",
        method:"GET",
        autoFetch:true,
        successMsg:""
    });

    const events = data? data as EventModel[] : [];
    
    return(<>
    All events. Register or cancel events
    {events?.map(item=><EventCard key={item._id} eventModel={item}/>)}</>)
}

export default Home;