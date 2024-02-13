import { useEffect, useRef } from "react";
import styles from "../Map/map.module.scss";
import { generateMap, generateMarker, getLatLng } from "../../../utils/map";

const mockLocations = [
    { x: 37.56516609048783, y: 126.97715864963087 },
    { x: 37.54516609048783, y: 126.97715864963087 },
    { x: 37.53521629903182, y: 126.97422607517471 }
];

const createMarker = (locations, map) => {
    locations.forEach((location, index) => {
        const position = getLatLng(location.x, location.y);
        generateMarker(map, position);
    });
};

export default function Map({
    locations = mockLocations,
    zoom = 15,
    addOption = {}
}) {
    const mapRef = useRef();
    const customMapOptions = {
        center: getLatLng(mockLocations[1].x, mockLocations[1].y),
        zoom: zoom,
        ...addOption
    };

    useEffect(() => {
        const mapDiv = mapRef.current;
        const map = generateMap(mapDiv, customMapOptions);
        // TO DO: 출발지 목적지 좌표값 받아오기
        createMarker(locations, map);
    }, [locations]);

    return (
        <div className={styles.wrapper}>
            <div ref={mapRef} className={styles.map} />
        </div>
    );
}
