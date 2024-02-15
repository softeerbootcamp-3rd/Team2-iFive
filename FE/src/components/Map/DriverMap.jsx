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
import { getKidInfo } from "../../service/api";
import { BottomSheet } from "../common/Bottomsheet/Bottomsheet";

const initState = {
    loading: "loading",
    success: "success",
    error: "error"
};

const childData = {
    name: "육 아들",
    time: "7:00~8:00",
    start: "서울 시청",
    goal: "국민대"
};

export function DriverMap() {
    const [kidData, setKidData] = useState([]);
    const [apiRequest, setApiRequest] = useState(initState.loading);

    const getKidData = async () => {
        try {
            const kidData = await getKidInfo();
            setApiRequest(initState.success);
        } catch (error) {
            setApiRequest(initState.error);
            console.error(error);
        }
    };

    const mapElementRef = useRef();
    const {
        location: { latitude, longitude },
        isLoading: locationLoading
    } = useCoords();
    const center = !locationLoading && getLatLng(latitude, longitude);
    const map = useMap(mapElementRef, { center }, locationLoading);

    const driverMarkerPosition =
        !locationLoading && getLatLng(latitude, longitude);

    // const destinationMarker = useMarker(map, map?.);
    // const departureMarker = useMarker(map, map?.)
    const driverMarker = useMarker(map, center);

    const webSocketRef = useRef(null);
    const lastLocationRef = useRef({ latitude: null, longitude: null });

    useEffect(() => {
        getKidData();
    }, []);

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
                childData={childData}
                userRole={userType.driver}
            ></BottomSheet>
        </div>
    );
}
