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
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">{event.title}</h1>

                {event.imageUrl && (
                    <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
                    />
                )}

                <p className="text-lg text-gray-600 mb-12">{event.description}</p>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Event Information</h3>

                        <div className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Venue</p>
                                    <p className="text-gray-900 font-medium">{event.venue}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <Calendar className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Date</p>
                                    <p className="text-gray-900 font-medium">{new Date(event.dateTime).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <Clock className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Time</p>
                                    <p className="text-gray-900 font-medium">{new Date(event.dateTime).toLocaleTimeString()}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <Users className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Capacity</p>
                                    <p className="text-gray-900 font-medium">{event.attendeeCount} / {event.capacity}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <User className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500 uppercase">Organizer</p>
                                    <p className="text-gray-900 font-medium">{event.organizerName}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col">
                        {isOrganizer ? (
                            <div className="space-y-4">
                                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer">
                                    Edit Event
                                </button>
                                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer">
                                    Delete Event
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleRegister}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 cursor-pointer text-lg"
                            >
                                {isAttendee ? "✓ Registered" : "Register"}
                            </button>
                        )}
                    </div>
                </div>

                {/* Attendees Section */}
                {isOrganizer && (
                    <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Attendees ({event.attendeeCount})</h3>
                        {event.attendees && event.attendees.length > 0 ? (
                            <div className="space-y-2">
                                {event.attendees.map(attendee => (
                                    <div key={attendee.userId} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                                        <p className="font-medium text-gray-900">{attendee.username}</p>
                                        <p className="text-gray-600 text-sm">{attendee.email}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center py-8">No attendees yet</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventDetails;