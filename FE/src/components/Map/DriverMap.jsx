import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./map.module.scss";
import { useMap } from "../../hooks/useMap";
import { useCoords } from "../../hooks/useCoords";
import { getLatLng } from "../../utils/map";
import { useMarker } from "../../hooks/useMarker";
import { Loader } from "../common/Loader/Loader";
import { WEBSOCKET_URL, ACCESS_TOKEN } from "../../constants/constants";
import { getCurrentLocation } from "../../utils/coords";
import { getAccessToken } from "../../utils/auth";
import { DriverBottomSheet } from "../common/Bottomsheet/Bottomsheet";
import { useFetchGet } from "../../hooks/useFetch";
import Car from "@/assets/car.svg";

export default function DriverMap() {
    const kidData = getKidData();
    console.log(kidData);
    const mapElementRef = useRef();
    const {
        location: { latitude, longitude },
        isLoading: locationLoading
    } = useCoords();

    const center = !locationLoading && getLatLng(latitude, longitude);
    const map = useMap(mapElementRef, { center }, locationLoading);
    const driverMarker = useMarker(map, center, markerIcon);

    const departurePos = getLatLng(
        kidData.startLatitude,
        kidData.startLongitude
    );
    const departureMarker = useMarker(map, departurePos);

    const destinationPos = getLatLng(kidData.endLatitude, kidData.endLongitude);
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
            <DriverBottomSheet data={kidData} />
        </div>
    );
}

const query = "driver/pickup/now";
const accessToken = getAccessToken();
const header = {
    Bearer: accessToken
};

const content = [
    "<div>",
    `       <img src="${Car}" width="35" height="35" alt="현재 위치"/>`,
    "</div>"
].join("");
const markerIcon = {
    icon: {
        content,
        size: new naver.maps.Size(20, 20),
        origin: new naver.maps.Point(16, 16)
        // anchor: new naver.maps.Point(25, 26)
    }
};

function getKidData() {
    const location = useLocation();
    return location.state.kidData;
}
