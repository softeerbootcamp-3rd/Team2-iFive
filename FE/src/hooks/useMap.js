import { useEffect, useState } from "react";

const initMapOptions = {
    mapDataControl: false,
    scaleControl: true,
    scaleControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
    },
    logoControl: true,
    logoControlOptions: {
        position: naver.maps.Position.TOP_LEFT
    }
};

const DEFAULT_ZOOM = 15;

export function useMap(
    mapRef,
    options = {
        center: new naver.maps.LatLng(options.center.lat, options.center.lng),
        zoom: DEFAULT_ZOOM
    }
) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (mapRef.current && !map) {
            const initializedMap = new naver.maps.Map(mapRef.current, {
                ...initMapOptions,
                ...options
            });
            setMap(initializedMap);
        }

        return () => {
            if (map) {
                // TODO 지도 인스턴스를 명시적으로 정리 로직 고민해보기
            }
        };
    }, [mapRef, options, map]);
    return map;
}
