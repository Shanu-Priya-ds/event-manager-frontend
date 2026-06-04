export function formatDate(dateObj:Date){
    return dateObj.toISOString().slice(0, 16); // Format: YYYY-MM-DDTHH:mm
}