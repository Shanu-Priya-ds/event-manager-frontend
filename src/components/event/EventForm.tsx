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
            <div className="flex flex-col gap-1 mb-4">
                <label className="font-medium text-gray-700 text-sm">Title</label>
                <input className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors" required type="text" name="title" onChange={handleFormChange} value={formData.title} placeholder="Event Title" />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label className="font-medium text-gray-700 text-sm">Description</label>
                <textarea className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors" value={formData.description} name="description" onChange={handleFormChange} placeholder="Enter event description"></textarea>
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label className="font-medium text-gray-700 text-sm">Venue</label>
                <input className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors" required value={formData.venue} name="venue" onChange={handleFormChange} type="text" placeholder="Venue" />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label className="font-medium text-gray-700 text-sm">Date and Time</label>
                <input className="px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors" required type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleFormChange} />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label className="font-medium text-gray-700 text-sm">Upload Image</label>
                <input className="px-3 py-2 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-colors cursor-pointer file:cursor-pointer file:border-0 file:bg-gray-100 file:px-3 file:py-1 file:rounded file:text-sm file:font-medium file:text-gray-700 file:hover:bg-gray-200" type="file" accept="image/*"
                    onChange={handleImageUpload} disabled={uploading}
                    placeholder="Upload Event Image" />
            </div>
            <button className="px-4 py-2 mt-4 w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={uploading}>{uploading ? "Uploading..." : "Save"}</button>
        </form>
    </div>);
}

export default EventForm;