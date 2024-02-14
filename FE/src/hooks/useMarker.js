import { useEffect, useState } from "react";

export function useMarker(map, position, options = {}) {
    const [marker, setMarker] = useState(null);
    useEffect(() => {
        if (!map || !position) {
            return;
        }
        const newMarker = new naver.maps.Marker({
            map,
            position,
            ...options
        });
        setMarker(newMarker);
        return () => marker.setMap(null);
    }, [map]);

    return marker;
}
