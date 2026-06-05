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


    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">My Events</h1>
                        <p className="text-lg text-gray-600">Manage and organize your events</p>
                    </div>
                    <button
                        className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
                        onClick={() => { setEditingEvent(null); setIsOpen(true); }}
                    >
                        + Add Event
                    </button>
                </div>

                {isOpen && (
                    <Dialog
                        isOpen={true}
                        title={editingEvent ? "Edit Event" : "Create Event"}
                        onClose={handleCloseDialog}
                        children={
                            <EventForm
                                onEventSaved={handleEventSaved}
                                event={editingEvent}
                                onClose={handleCloseDialog}
                            />
                        }
                    />
                )}

                {myEvents && myEvents.length > 0 ? (
                    <div className="flex flex-wrap gap-6">
                        {myEvents.map(eventModel => (
                            <div key={eventModel._id}>
                                <EventCard
                                    key={eventModel._id}
                                    onEdit={() => handleEdit(eventModel)}
                                    onDeleted={() => handleDeleted(eventModel._id)}
                                    eventModel={eventModel}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 mb-6">You haven't created any events yet.</p>
                        <button
                            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 cursor-pointer"
                            onClick={() => { setEditingEvent(null); setIsOpen(true); }}
                        >
                            Create Your First Event
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard;