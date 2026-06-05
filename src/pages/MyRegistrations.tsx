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

    const RegistrationList = data ? data as MyRegistrationsRes[] : [];

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">My Registrations</h1>
                    <p className="text-lg text-gray-600">View all events you've registered for</p>
                </div>

                {RegistrationList && RegistrationList.length > 0 ? (
                    <div className="flex flex-wrap gap-6">
                        {RegistrationList.map(registeredEvent => (
                            <EventCard
                                key={registeredEvent._id}
                                eventModel={registeredEvent.eventId}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-600 mb-6">You haven't registered for any events yet.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyRegistrations;