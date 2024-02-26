import { useEffect, useRef } from "react";
import { useLocation, useLoaderData } from "react-router-dom";
import styles from "./map.module.scss";
import { useMap } from "@/hooks/useMap";
import { useCoords } from "@/hooks/useCoords";
import { getLatLng } from "@/utils/map";
import { useMarker } from "@/hooks/useMarker";
import { Loader } from "@/components/Loader/Loader";
import { WEBSOCKET_URL } from "@/constants/constants";
import { getCurrentLocation } from "@/utils/coords";
import { getAccessToken } from "@/utils/auth";
import { DriverBottomSheet } from "@/components/Bottomsheet/Bottomsheet";
import Car from "@/assets/car.svg";
import { getKidInfo } from "@/service/childrenAPI";
import { parseData } from "../../utils/parseData";

export default function DriverMap() {
    const ACCESS_TOKEN = getAccessToken();

    const childrenData = useLoaderData();
    const { startLatitude, startLongitude, endLatitude, endLongitude } =
        childrenData[0];
    // ODO 에러 해결: Uncaught TypeError: Cannot destructure property 'startLatitude' of 'childrenData[0]' as it is undefined.

    const mapElementRef = useRef();
    const {
        location: { latitude, longitude },
        isLoading: locationLoading
    } = useCoords();

    const center = !locationLoading && getLatLng(latitude, longitude);
    const map = useMap(mapElementRef, { center }, locationLoading);
    const driverMarker = useMarker(map, center, markerIcon);

    const departurePos = getLatLng(startLatitude, startLongitude);
    const departureMarker = useMarker(map, departurePos);

    const destinationPos = getLatLng(endLatitude, endLongitude);
    const destinationMarker = useMarker(map, destinationPos);

    const polyline = new naver.maps.Polyline({
        map: map,
        path: []
    });

    const webSocketRef = useRef(null);
    const lastLocationRef = useRef({ latitude: null, longitude: null });

    useEffect(() => {
        if (!driverMarker) return;
        let reconnect;

        webSocketRef.current = new WebSocket(WEBSOCKET_URL, [ACCESS_TOKEN]);
        const sendLocation = (location) => {
            if (
                webSocketRef.current &&
                webSocketRef.current.readyState === WebSocket.OPEN
            ) {
                console.log(location.latitude, location.longitude);
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
                    // const newLocation = {
                    //     latitude: location.latitude,
                    //     longitude: location.longitude
                    // };
                    sendLocation(location);
                    if (driverMarker) {
                        driverMarker.setPosition(
                            getLatLng(location.latitude, location.longitude)
                        );
                        // map.setCenter(
                        //     getLatLng(
                        //         newLocation.latitude,
                        //         newLocation.longitude
                        //     )
                        // );
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
        }, 3000);

        webSocketRef.current.onopen = () => console.log("WebSocket connected");
        webSocketRef.current.onmessage = ({ data }) => {
            const { path } = JSON.parse(data);
            let pathList = [];
            path.forEach((element) => {
                pathList.push(new naver.maps.LatLng(element[1], element[0]));
            });
            polyline.setPath(pathList);
        };
        webSocketRef.current.onerror = (error) =>
            console.error("WebSocket error: ", error);
        webSocketRef.current.onclose = () => {
            console.log("WebSocket disconnected");
            reconnect = setTimeout(connectWebSocket, 1000);
        };

        return () => {
            clearInterval(updateLocation);
            clearInterval(reconnect);
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
            map.destroy();
        };
    }, [driverMarker]);

    return (
        <div className={styles.wrapper}>
            {!map && <Loader />}
            <div ref={mapElementRef} id="map" className={styles.map} />
            <DriverBottomSheet childrenData={childrenData} />
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
    `       <img src="${Car}" width="40" height="40" alt="현재 위치"/>`,
    "</div>"
].join("");
const markerIcon = {
    icon: {
        content
        // size: new naver.maps.Size(40, 40),
        // origin: new naver.maps.Point(16, 16)
        // anchor: new naver.maps.Point(25, 26)
    }
};

export async function fetchNowPickUpData() {
    const fetchData = await getKidInfo("driver/pickup/now/child");
    return parseData(fetchData.data);
}
