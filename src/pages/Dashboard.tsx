// manage your events (organizer)
//Lists only your events
// Shows registration counts per event
// Has Create, Edit, Delete actions
// You never leave this page to manage your events

import { useEffect, useState} from "react";
import Dialog from "../components/utils/Dialog";
import EventForm from "../components/event/EventForm";
import useApi from "../hooks/useApi";
import type { EventModel } from "../types/types";
import EventCard from "../components/event/EventCard";

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EventModel | null>(null);

    const [myEvents, setMyEvents] = useState<EventModel[]>([]);

    const { data } = useApi<EventModel>({
        url: "/events",
        method: "GET",
        autoFetch: true,
        successMsg: ""
    })

    // const myEvents = data? data as EventModel[] :[];
    useEffect(() => {
        if (data)
            setMyEvents(data as EventModel[]);
    }, [data]);

    const handleEdit = (event: EventModel) => {
        setEditingEvent(event);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
        setEditingEvent(null);
    };

    const handleDeleted = (eventId: string) => {

        //refresh the list - emove the deleted event from the list
        setMyEvents(prev => prev.filter(eventModel => eventModel._id !== eventId));
    }
    // Dashboard
   const handleEventSaved = (savedEvent: EventModel) => {
    setMyEvents(prev => 
        editingEvent 
            ? prev.map(e => e._id === savedEvent._id ? savedEvent : e)  // Edit
            : [...prev, savedEvent]  // Add
    );
};


    return (<>
        <div className="flex justify-end m-4 ">
            <button className="bg-gray-400 text-xs cursor-pointer text-white px-1 py-1 rounded"
            onClick={() => { setEditingEvent(null); setIsOpen(true); }}>Add Event</button>
            {isOpen &&
                <Dialog isOpen={true} title={editingEvent ? "Edit Event" : "Create Event"}
                    onClose={handleCloseDialog}
                    children={<EventForm onEventSaved={handleEventSaved} 
                    event={editingEvent} onClose={handleCloseDialog} />}>

                </Dialog>
            }
        </div>
        <div className="flex flex-wrap gap-3 m-4">
            {myEvents &&
                myEvents.map(eventModel => <div key={eventModel._id}>
                    <EventCard key={eventModel._id} onEdit={() => handleEdit(eventModel)}
                        onDeleted={() => handleDeleted(eventModel._id)} eventModel={eventModel} />
                </div>)}
        </div>
    </>)
}

export default Dashboard;