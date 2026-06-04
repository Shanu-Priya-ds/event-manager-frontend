// manage your events (organizer)
//Lists only your events
// Shows registration counts per event
// Has Create, Edit, Delete actions
// You never leave this page to manage your events

import { useState } from "react";
import Dialog from "../components/utils/Dialog";
import EventForm from "../components/event/EventForm";
import useApi from "../hooks/useApi";
import type { EventModel } from "../types/types";
import EventCard from "../components/event/EventCard";
import { Pencil, Trash2 } from "lucide-react"

function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<EventModel | null>(null);

    const {data} = useApi<EventModel>({
        url:"/events",
        method:"GET",
        autoFetch:true,
        successMsg:""
    })

    const myEvents = data? data as EventModel[] :[];

    const handleEdit = (event: EventModel) => {
        setEditingEvent(event);
        setIsOpen(true);
    };

    const handleCloseDialog = () => {
        setIsOpen(false);
        setEditingEvent(null);
    };

    return (<>
    <div>
    View your events managed by you!
        <button onClick={() => { setEditingEvent(null); setIsOpen(true); }}>Add Event</button>
        {isOpen &&
            <Dialog isOpen={true} title={editingEvent ? "Edit Event" : "Create Event"}
                onClose={handleCloseDialog}
                children={<EventForm event={editingEvent} onClose={handleCloseDialog} />}>

            </Dialog>
        }
        </div>
        <div>
            {myEvents &&
            myEvents.map(eventModel=><div key={eventModel._id}>
                <EventCard eventModel={eventModel}/>
                <Pencil onClick={() => handleEdit(eventModel)} className="w-4 h-4 cursor-pointer" />
                <Trash2 className="w-4 h-4 cursor-pointer" />
            </div>)}
        </div>
    </>)
}

export default Dashboard;