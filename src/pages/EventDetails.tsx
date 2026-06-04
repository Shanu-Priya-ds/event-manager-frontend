import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useApi from "../hooks/useApi";
import type { EventModel } from "../types/types";

function EventDetails() {
    const { id } = useParams();
    const auth = useAuth();

    const { data: event, loading, error } = useApi<EventModel>({
        url: `/events/${id}`,
        method: "GET",
        autoFetch: true,
        successMsg:""
    });

    if (loading) return <div><p>Loading event details...</p></div>;
    if (error) return <div><p style={{ color: "red" }}>Error: {error}</p></div>;
    if (!event || Array.isArray(event)) return <div><p>Event not found</p></div>;

    const isOrganizer = event.organizerId === auth.user?.userId;
    const isAttendee = event.attendees?.some((a: any) => a.userId === auth.user?.userId);

    return (
        <div>
            <h1>{event.title}</h1>

            {event.imageUrl && <img src={event.imageUrl} alt={event.title} style={{ maxWidth: "100%", height: "auto" }} />}

            <div>
                <h3>Description</h3>
                <p>{event.description}</p>
            </div>

            <div>
                <p><strong>📍 Venue:</strong> {event.venue}</p>
                <p><strong>📅 Date:</strong> {new Date(event.dateTime).toLocaleDateString()}</p>
                <p><strong>🕐 Time:</strong> {new Date(event.dateTime).toLocaleTimeString()}</p>
                <p><strong>👥 Capacity:</strong> {event.attendeeCount} / {event.capacity}</p>
                <p><strong>👤 Organizer:</strong> {event.organizerName}</p>
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
                <button style={{ backgroundColor: isAttendee ? "green" : "blue", color: "white" }}>
                    {isAttendee ? "Registered ✓" : "Register"}
                </button>
            )}
        </div>
    );
}

export default EventDetails;