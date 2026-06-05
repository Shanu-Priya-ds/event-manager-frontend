import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";
import type { EventModel } from "../../types/types";
import useApi from "../../hooks/useApi";
import { formatDate } from "../../utils/utils";
import { uploadImage } from "../../services/uploadService";
import toast from "react-hot-toast";

function EventForm({ event, onClose, onEventSaved }: { event?: EventModel | null, onClose: () => void, onEventSaved: (eventData: EventModel) => void }) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        venue: "",
        dateTime: formatDate(new Date()), //set current date
        imageUrl: ""
    });

    const [uploading, setUploading] = useState(false);

    //true if an event object exists (editing mode)
    //false if event is null/undefined (creating new event)
    const isEditing = !!event;

    const { data, execute } = useApi<EventModel>({
        url: isEditing ? `/events/${event?._id}` : "/events",
        method: isEditing ? "PUT" : "POST",
        autoFetch: false,
        successMsg: isEditing ? "Event updated successfully." : "Event created successfully."
    });

    useEffect(() => {
        if (event) {
            const dateObj = new Date(event.dateTime);
            const formattedDateTime = formatDate(dateObj);
            setFormData({
                title: event.title,
                description: event.description,
                venue: event.venue,
                dateTime: formattedDateTime,
                imageUrl: event.imageUrl
            });
        }
    }, [event]);

    useEffect(() => {
        if (data) {
            onEventSaved?.(data as EventModel);
            onClose();
        }
    }, [data]);

    async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const imageUrl = await uploadImage(file);
            setFormData(prev => ({ ...prev, imageUrl }));
        } catch (error) {
            console.error("Failed to upload image:", error);
            toast.error("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    }

    function saveEvent(e: SyntheticEvent) {
        e.preventDefault();
        execute(formData);
    }

    function handleFormChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    return (<div>
        <form onSubmit={saveEvent}>
            <div className="flex flex-col gap-1 mb-2">
                <label>Title</label>
                <input className=" px-2 bg-gray-100 rounded-md" required type="text" name="title" onChange={handleFormChange} value={formData.title} placeholder="Event Title" />
            </div>
            <div className="flex flex-col gap-1 mb-2">
                <label>Description</label>
                <textarea className="px-2 bg-gray-100 rounded-md" value={formData.description} name="description" onChange={handleFormChange} placeholder="Enter event description"></textarea>
            </div>
            <div className="flex flex-col gap-1 mb-2">
                <label>Venue</label>
                <input className="px-2 bg-gray-100 rounded-md" required value={formData.venue} name="venue" onChange={handleFormChange} type="text" placeholder="Venue" />
            </div>
            <div className="flex flex-col gap-1 mb-2">
                <label>Date and Time</label>
                <input className="px-2 bg-gray-100 rounded-md" required type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleFormChange} />
            </div>
            <div className="flex flex-col gap-1 mb-2">
                <label>Upload Image</label>
                <input className="bg-gray-100 rounded-md" type="file" accept="image/*"
                    onChange={handleImageUpload} disabled={uploading}
                    placeholder="Upload Event Image" />
            </div>
            <button className="px-2 py-0.5 mt-2 w-full bg-gray-300 cursor-pointer rounded-md" type="submit" disabled={uploading}>Save</button>
        </form>
    </div>);
}

export default EventForm;