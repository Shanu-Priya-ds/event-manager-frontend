import { useNavigate } from "react-router-dom";
import type { EventCardProps } from "../../types/types";
import EditDeleteEvent from "./EditDeleteEvent";
import { formatDateTime } from "../../utils/utils";

function EventCard({ eventModel, onEdit, onDeleted }: EventCardProps) {
    const navigate = useNavigate();
    function handlePageRedirect() {
        navigate(`/eventDetails/${eventModel._id}`);
    }
    return (
        <div className="flex flex-col border border-gray-200 rounded-xl bg-white overflow-hidden hover:border-gray-300 transition-colors">
            <img src={eventModel.imageUrl} alt="Event image" onClick={handlePageRedirect}
                className="w-full h-40 object-cover cursor-pointer" />

            <div className="flex flex-col gap-2 p-4">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                    {eventModel.title}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2">{eventModel.description}</p>

                <p className="text-xs text-gray-500">
                    {formatDateTime(eventModel.dateTime)}
                </p>

                <p className="text-xs text-gray-500">{eventModel.venue}</p>

                {onEdit && onDeleted && (
                    <EditDeleteEvent onDeleted={onDeleted} onEdit={onEdit} event={eventModel} />
                )}
            </div>
        </div>)

}

export default EventCard;