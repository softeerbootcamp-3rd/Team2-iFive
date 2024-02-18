import { useEffect, useRef, useState } from "react";
import styles from "./map.module.scss";
import { useMap } from "../../hooks/useMap";
import { useCoords } from "../../hooks/useCoords";
import { getLatLng } from "../../utils/map";
import { useMarker } from "../../hooks/useMarker";
import { Loader } from "../common/Loader/Loader";
import {
    WEBSOCKET_URL,
    ACCESS_TOKEN,
    userType
} from "../../constants/constants";
import { getCurrentLocation } from "../../utils/coords";
import { getAccessToken } from "../../utils/auth";
import { BottomSheet } from "../common/Bottomsheet/Bottomsheet";
import { useFetchGet } from "../../hooks/useFetch";

export function DriverMap() {
    const [kidData, setKidData] = useFetchGet(query, header);
    const { loading, error, data } = kidData;

    const mapElementRef = useRef();
    const {
        location: { latitude, longitude },
        isLoading: locationLoading
    } = useCoords();

    const center = !locationLoading && getLatLng(latitude, longitude);
    const map = useMap(mapElementRef, { center }, locationLoading);

    const departureMarker = useMarker(map, center);
    const driverMarker = useMarker(map, center);

    const destinationPos = getLatLng(
        exampleData[0].endLatitude,
        exampleData[0].endLongitude
    );
    const destinationMarker = useMarker(map, destinationPos);

    const webSocketRef = useRef(null);
    const lastLocationRef = useRef({ latitude: null, longitude: null });

    useEffect(() => {
        if (!driverMarker) return;
        let increase = 0.0001;
        webSocketRef.current = new WebSocket(WEBSOCKET_URL, [ACCESS_TOKEN]);
        const sendLocation = (location) => {
            if (
                webSocketRef.current &&
                webSocketRef.current.readyState === WebSocket.OPEN
            ) {
                webSocketRef.current.send(
                    JSON.stringify({
                        longitude: location.longitude,
                        latitude: location.latitude,
                        createdAt: "2024-02-13T13:45:30"
                    })
                );
            }
        };
        const updateLocation = setInterval(() => {
            getCurrentLocation()
                .then((location) => {
                    lastLocationRef.current = location;
                    const newLocation = {
                        latitude: location.latitude + increase,
                        longitude: location.longitude
                    };
                    sendLocation(newLocation);
                    if (driverMarker) {
                        driverMarker.setPosition(
                            getLatLng(
                                newLocation.latitude,
                                newLocation.longitude
                            )
                        );
                        map.setCenter(
                            getLatLng(
                                newLocation.latitude,
                                newLocation.longitude
                            )
                        );
                    }
                })
                .catch((error) => {
                    console.error(error);
                    if (
                        lastLocationRef.current.latitude &&
                        lastLocationRef.current.longitude
                    ) {
                        sendLocation(lastLocationRef.current);
                    }
                });
            increase += 0.0001;
        }, 1000);

        webSocketRef.current.onopen = () => console.log("WebSocket connected");
        webSocketRef.current.onerror = (error) =>
            console.error("WebSocket error: ", error);
        webSocketRef.current.onclose = () =>
            console.log("WebSocket disconnected");
        return () => {
            clearInterval(updateLocation);
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, [driverMarker]);

    return (
        <div className={styles.wrapper}>
            {!map && <Loader />}
            <div ref={mapElementRef} id="map" className={styles.map} />
            <BottomSheet
                childData={exampleData}
                userRole={userType.driver}
            ></BottomSheet>
        </div>
    );
}

const exampleData = [
    {
        childName: "김하나",
        childImage: "String...",
        startLatitude: 37.5138649,
        startLongitude: 127.0295296,
        startAddress: "에티버스러닝 학동캠퍼스",
        endLatitude: 37.51559,
        endLongitude: 127.0316161,
        endAddress: "코마츠"
    }
];

const query = "driver/pickup/now";
const accessToken = getAccessToken();
const header = {
    Bearer: accessToken
};
