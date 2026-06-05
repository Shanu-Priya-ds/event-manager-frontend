//browse all events (post-login)
//register/cancel events

import EventCard from "../components/event/EventCard";
import useApi from "../hooks/useApi";
import type { EventModel } from "../types/types";

function Home() {

    const { data } = useApi<EventModel>({
        url: "/events/all",
        method: "GET",
        autoFetch: true,
        successMsg: ""
    });

    const events = data ? data as EventModel[] : [];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">All Events</h1>
                    <p className="text-lg text-gray-600">Discover and register for upcoming events</p>
                </div>

                {events && events.length > 0 ? (
                    <div className="flex flex-wrap gap-6">
                        {events.map(item => (
                            <EventCard key={item._id} eventModel={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600">No events available at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home;