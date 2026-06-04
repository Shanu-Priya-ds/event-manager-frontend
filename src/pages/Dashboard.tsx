// manage your events (organizer)
//Lists only your events
// Shows registration counts per event
// Has Create, Edit, Delete actions
// You never leave this page to manage your events

import { useState } from "react";
import Dialog from "../components/utils/Dialog";
import EventForm from "../components/event/EventForm";


function Dashboard() {
    const [isOpen, setIsOpen] = useState(false);

    return (<>View your events managed by you!
        <button onClick={() => setIsOpen(true)}>Add Event</button>
        {isOpen &&
            <Dialog isOpen={true} title="Create Event"
                onClose={() => setIsOpen(false)}
                children={<EventForm />}>

            </Dialog>
        }
    </>)
}

export default Dashboard;