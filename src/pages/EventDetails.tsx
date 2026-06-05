import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import type { EventModel } from "../types/types";
import { Calendar, Clock, MapPin, User, Users } from "lucide-react";

function EventDetails() {
    const { id } = useParams();
    const auth = useAuth();

    const { data: event, loading } = useApi<EventModel>({
        url: `/events/${id}`,
        method: "GET",
        autoFetch: true,
        successMsg: ""
    });

    const { execute: register } = useApi<EventModel>({
        url: `registrations/${id}`,
        method: "POST",
        autoFetch: false,
        successMsg: `Successfully registered`
    })

    if (loading) return <div><p>Loading event details...</p></div>;
   // if (error) return <div><p style={{ color: "red" }}>Error: {error}</p></div>;
    if (!event || Array.isArray(event)) return <div><p>Event not found</p></div>;

    const isOrganizer = event.organizerId === auth.user?.userId;
    const isAttendee = event.attendees?.some((a: any) => a.userId === auth.user?.userId);
     console.log(isAttendee)


    function handleRegister() {
        if (!isAttendee) {
            register();
        }
    }

    return (
        <div className="m-3">
            <h1 className="pb-3 font-bold text-2xl">{event.title}</h1>

            {event.imageUrl && <img src={event.imageUrl} alt={event.title}
                style={{ maxWidth: "100%", height: "auto" }} />}

            <p className="p-3">{event.description}</p>


            <div>
                <div className="flex gap-1">
                    <MapPin className="w-3 h-3 self-center" />
                    <p> Venue: {event.venue}</p>
                </div>
                <div className="flex gap-1">
                    <Calendar className="w-3 h-3 self-center" />
                    <p> Date: {new Date(event.dateTime).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-1">
                    <Clock className="w-3 h-3 self-center" />
                    <p> Time: {new Date(event.dateTime).toLocaleTimeString()}</p>
                </div>
                <div className="flex gap-1">
                    <Users className="w-3 h-3 self-center" />
                    <p> Capacity: {event.attendeeCount} / {event.capacity}</p>
                </div>
                <div className="flex gap-1">
                    <User className="w-3 h-3 self-center" />

                    <p> Organizer: {event.organizerName}</p>
                </div>
            </div>

            {isOrganizer ? (
                <>
                    <h3>Attendees ({event.attendeeCount})</h3>
                    {event.attendees && event.attendees.length > 0 ? (
                        <ul>
                            {event.attendees.map(attendee => (
                                <li key={attendee.userId}>{attendee.username} ({attendee.email})</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No attendees yet</p>
                    )}
                    <div>
                        <button style={{ marginRight: "10px" }}>Edit Event</button>
                        <button style={{ backgroundColor: "red", color: "white" }}>Delete Event</button>
                    </div>
                </>
            ) : (
                <button className=" m-2 bg-gray-300 cursor-pointer text-sm rounded-md px-2 py-0.5"
                    onClick={handleRegister}>
                    {isAttendee ? "Registered ✓" : "Register"}
                </button>
            )}
        </div>
    );
}

export default EventDetails;