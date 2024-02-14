import { useEffect, useState } from "react";
const DEFAULT_ZOOM = 15;

const initMapOptions = {
    zoom: DEFAULT_ZOOM,
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

export function useMap(mapRef, options = {}, isLoading = false) {
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (isLoading || !mapRef.current || map) {
            return;
        }

        const initializedMap = new naver.maps.Map(mapRef.current, {
            ...initMapOptions,
            ...options
        });
        setMap(initializedMap);

        // TODO 지도 인스턴스 정리 로직 고민해보기
        return () => {
            setMap(null);
        };
    }, [isLoading]);
    return map;
}
