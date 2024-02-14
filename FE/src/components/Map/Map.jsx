import { useEffect, useRef } from "react";
import styles from "./map.module.scss";
import { getCurrentLocation } from "../../utils/getCurrentLocation";
import { generateMap, generateMarker, getLatLng } from "../../utils/map";
import { useLocationSender } from "../../service/webSocket";

// 마커 이미지
// 실시간 위치 전송 -> 테스트용으로 위치 업뎃 함수 하나 만들기

const update = ({ latitude, longitude }, increase) => {
    const updateLatitude = latitude + increase;
    const newLocation = {
        latitude: updateLatitude,
        longitude
    };
    const coord = getLatLng(newLocation.latitude, newLocation.longitude);
    return { newLocation, coord };
};

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

const options = {
    zoom: 10,
    center: getLatLng(37.53521629903, 126.97422607517)
};
export default function Map({
    locations = mockLocations,
    zoom = 15,
    addOption = {}
}) {
    const mapRef = useRef();

    //비동기 통신으로 출발지, 목적지, 받아오기

    // useLocationSender();

    const webSocketRef = useRef(null);
    const lastLocationRef = useRef({ latitude: null, longitude: null });

    useEffect(() => {
        const mapDiv = mapRef.current;
        const map = generateMap(mapDiv, options);
        const departure = generateMarker(
            map,
            getLatLng(37.56516609048, 126.97715864963)
        );
        //driver만 따로 이미지 입히기
        const destination = generateMarker(
            map,
            getLatLng(37.53521629903, 126.97422607517)
        );
        const driverLocation = generateMarker(
            map,
            getLatLng(37.54516609048, 126.97715864963)
        );
        const center = getLatLng();
        // TO DO: 출발지 목적지 좌표값 받아오기

        webSocketRef.current = new WebSocket(
            "ws://0.tcp.jp.ngrok.io:11952/ws/location-tracking?token=eyJhbGciOiJIUzM4NCJ9.eyJhdXRoZW50aWNhdGVVc2VyIjoie1widXNlcklkXCI6XCJkcml2ZXIxXCIsXCJyb2xlXCI6XCJEUklWRVJcIn0iLCJleHAiOjE3MDc4ODI0NDd9.JCzVyxzdoZB8ENjAZ_uo-WYiV1ZttpmiEFwZpP8GNXv4e6oPL7oxi0u46KZLYiPR"
        );

        const sendLocation = (location) => {
            if (
                webSocketRef.current &&
                webSocketRef.current.readyState === WebSocket.OPEN
            ) {
                webSocketRef.current.send(
                    JSON.stringify({
                        sender: "driver1",
                        receiver: "parent1",
                        ...location
                    })
                );

                console.log({
                    sender: "driver1",
                    receiver: "parent1",
                    ...location
                });
            }
        };

        let test = 0.0001;
        const locationInterval = setInterval(() => {
            getCurrentLocation()
                .then((location) => {
                    lastLocationRef.current = location;
                    // console.log(location);
                    const { newLocation, coord } = update(location, test);
                    sendLocation(location);
                    driverLocation.setPosition(
                        getLatLng(location.latitude + test, location.longitude)
                    );
                })
                .catch((error) => {
                    console.error("Error getting location", error);
                    if (
                        lastLocationRef.current.latitude &&
                        lastLocationRef.current.longitude
                    ) {
                        sendLocation(lastLocationRef.current);
                    }
                });
            test += 0.0001;
        }, 1000);
        webSocketRef.current.onopen = () => console.log("WebSocket connected");
        webSocketRef.current.onerror = (error) =>
            console.error("WebSocket error: ", error);
        webSocketRef.current.onclose = () =>
            console.log("WebSocket disconnected");
        return () => {
            clearInterval(locationInterval);
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <div ref={mapRef} className={styles.map} />
        </div>
    );
}
