import { useNavigate } from "react-router-dom";
import type { EventCardProps } from "../../types/types";
import EditDeleteEvent from "./EditDeleteEvent";
import { formatDateTime } from "../../utils/utils";
import { Calendar, MapPin } from "lucide-react";

function EventCard({ eventModel, onEdit, onDeleted }: EventCardProps) {
    const navigate = useNavigate();
    function handlePageRedirect() {
        navigate(`/eventDetails/${eventModel._id}`);
    }
    return (
        <div className="flex flex-col w-50 h-65 border border-gray-200 rounded-xl bg-white 
        overflow-hidden hover:border-gray-300 transition-colors">
            <img src={eventModel.imageUrl} alt="Event image" onClick={handlePageRedirect}
                className="w-full h-35 object-cover cursor-pointer" />

            <div className="flex flex-col gap-2 p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                    {eventModel.title}
                </h3>

                {/* <p className="text-xs text-gray-500 line-clamp-2">{eventModel.description}</p> */}
                <div className="flex gap-1">
                    <Calendar className="w-3 h-3 self-center" />
                    <p className="text-xs text-gray-500">
                        {formatDateTime(eventModel.dateTime)}
                    </p>

                </div>
                <div className="flex gap-1">
                    <MapPin className="w-3 h-3 self-center"/>
                    <p className="text-xs text-gray-500">{eventModel.venue}</p>
                </div>
                {onEdit && onDeleted && (<div className="flex justify-end">
                    <EditDeleteEvent onDeleted={onDeleted} onEdit={onEdit} event={eventModel} />
                </div>
                )}
            </div>
        </div>)

}

export default EventCard;