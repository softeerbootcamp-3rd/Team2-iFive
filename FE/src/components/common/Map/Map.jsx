import { useEffect } from "react";
import { BottomSheet } from "../Bottomsheet/Bottomsheet";
import styles from "../Map/map.module.scss";

export const initMapOptions = {
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

const mockLocations = [
    { x: 37.56516609048783, y: 126.97715864963087 },
    { x: 37.56516609048783, y: 126.97715864963087 },
    { x: 37.53521629903182, y: 126.97422607517471 }
];

const createMarker = (locations, map) => {
    locations.forEach((location, index) => {
        new naver.maps.Marker({
            position: new naver.maps.LatLng(location.x, location.y),
            map: map
        });
    });
};

export default function Map({
    locations = mockLocations,
    zoom = 16,
    width = "100%",
    height = "100%"
}) {
    const customMapOptions = {
        ...initMapOptions,
        center: new naver.maps.LatLng(mockLocations[0].x, mockLocations[0].y),
        zoom: zoom
    };

    useEffect(() => {
        const mapDiv = document.getElementById("map");
        const map = new window.naver.maps.Map(mapDiv, customMapOptions);
        // TO DO: 출발지 목적지 좌표값 받아오기
        createMarker(locations, map);
    }, [locations]);

    return (
        <div className={styles.wrapper}>
            <div id="map" style={{ width, height }} />
        </div>
    );
}
