export function formatDate(dateObj:Date){
    return dateObj.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
}


export function formatDateTime(date:string){
return new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
})

}