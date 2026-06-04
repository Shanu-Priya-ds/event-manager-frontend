function EventForm(){
    return(<div>
        <form>
            <input type="text" placeholder="Event Title"/>
         <textarea placeholder="Enter event description"></textarea>
         <input type="text" placeholder="Venue"/>
         <button type="submit">Save</button>
    </form>
    </div>);
}

export default EventForm;