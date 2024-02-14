import { useEffect, useRef } from "react";
import styles from "./map.module.scss";
import { useMap } from "../../hooks/useMap";
import { useCoords } from "../../hooks/useCoords";
import { getLatLng } from "../../utils/map";
import { useMarker } from "../../hooks/useMarker";
import { Loader } from "../common/Loader/Loader";
import { WEBSOCKET_URL } from "../../constants/constants";
import { getCurrentCoords, getCurrentLocation } from "../../utils/coords";

export function DriverMap() {
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
    const driverMarker = useMarker(map, driverMarkerPosition);

    const webSocketRef = useRef(null);
    const lastLocationRef = useRef({ latitude: null, longitude: null });

    useEffect(() => {
        if (!driverMarker) return;
        let increase = 0.0001;
        webSocketRef.current = new WebSocket(WEBSOCKET_URL);
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
        </div>
    );
}
