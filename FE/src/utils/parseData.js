export function removeCityPrefix(address) {
    return address !== null && address.replace("서울특별시 ", "");
}

export function formatDate(dateString) {
    return dateString !== null && dateString.split("T")[0];
}

export function formatTime(timeString) {
    return timeString !== undefined && timeString.split("T")[1].slice(0, 5);
}
