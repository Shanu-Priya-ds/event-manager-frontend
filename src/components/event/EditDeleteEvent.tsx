import { Pencil, Trash2 } from "lucide-react";
import useApi from "../../hooks/useApi";
import type { EditDeleteEventProps } from "../../types/types";
import { useEffect } from "react";




function EditDeleteEvent({ event, onEdit, onDeleted }: EditDeleteEventProps) {
    const { data, execute: deleteEvent } = useApi<void>({
        url: `/events/${event._id}`,
        method: "DELETE",
        autoFetch: false,
        successMsg: "Event deleted successfully."
    });

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this event?")) {
            deleteEvent();
            //  if(data!=null) onDeleted(); // Callback to refresh events list in parent
        }
    }
    useEffect(() => {
        if (data) {
            onDeleted();
        }
    }, [data, onDeleted]);

    return (
        <div className="flex gap-3">
            <Pencil
                onClick={() => onEdit(event)}
                className="w-4 h-4 cursor-pointer hover:text-blue-600"
            />
            <Trash2
                onClick={handleDelete}
                className="w-4 h-4 cursor-pointer hover:text-red-600"
            />
        </div>
    );
}

export default EditDeleteEvent;
