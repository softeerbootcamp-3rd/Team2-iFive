import { useEffect } from "react";

export function useMarker(map, position, options = {}) {
    useEffect(() => {
        if (!map || !position) return;

        const marker = new naver.maps.Marker({
            map,
            position,
            ...options
        });

        return () => marker.setMap(null);
    }, [map, position, options]);
}
