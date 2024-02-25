export function isHaveItems(data) {
    return data.length === 0 ? false : true;
}

export function removeCityPrefix(address) {
    return address !== null && address.replace("서울특별시 ", "");
}

export function formatDate(dateString) {
    return dateString !== null && dateString.split("T")[0];
}

export function formatTime(timeString) {
    return timeString !== undefined && timeString.split("T")[1].slice(0, 5);
}

export function parseData(childrenData) {
    return childrenData.map((element) => {
        return {
            ...element,
            startAddress: removeCityPrefix(element.startAddress),
            endAddress: removeCityPrefix(element.endAddress),
            pickUpStartTime: formatTime(element.pickUpStartTime),
            pickUpEndTime: formatTime(element.pickUpEndTime)
        };
    });
}
