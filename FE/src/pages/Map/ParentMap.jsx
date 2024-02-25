import styles from "./map.module.scss";
import { useEffect, useRef } from "react";
import { useCoords } from "@/hooks/useCoords";
import { getLatLng } from "@/utils/map";
import { useMap } from "@/hooks/useMap";
import { Loader } from "@/components/Loader/Loader";
import { ParentBottomSheet } from "@/components/Bottomsheet/Bottomsheet";
import { PARENT_TOKEN, WEBSOCKET_URL } from "@/constants/constants";
import { useMarker } from "@/hooks/useMarker";
import { getAccessToken } from "@/utils/auth";
import Car from "@/assets/car.svg";
import { useLocation } from "react-router-dom";

export default function ParentMap() {
    const ACCESS_TOKEN = getAccessToken();

    const mapElementRef = useRef();
    const childrenData = getChildrenData();
    const kidData = childrenData[0];

    const center = getLatLng(kidData.startLatitude, kidData.startLongitude);

    const map = useMap(mapElementRef, { center });

    const departureMarker = useMarker(map, center);
    const driverMarker = useMarker(map, center, markerIcon);

    const destinationPos = getLatLng(kidData.endLatitude, kidData.endLongitude);
    const destinationMarker = useMarker(map, destinationPos);

    const webSocketRef = useRef();

    useEffect(() => {
        if (!driverMarker) return;
        webSocketRef.current = new WebSocket(WEBSOCKET_URL, [ACCESS_TOKEN]);

        webSocketRef.current.onopen = () => console.log("WebSocket Connected!");
        webSocketRef.current.onmessage = ({ data }) => {
            // 위치 정보 받고 지도에 업데이트
            const { latitude, longitude } = JSON.parse(data);
            console.log(driverMarker);
            console.log(latitude, longitude);
            driverMarker.setPosition(getLatLng(latitude, longitude));
            map.setCenter(getLatLng(latitude, longitude));
        };
        webSocketRef.current.onerror = (error) =>
            console.error("WebSocket: ", error);
        webSocketRef.current.onclose = () =>
            console.log("WebSocket Disconnected!");

        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, [driverMarker]);

    return (
        <div className={styles.wrapper}>
            {!map && <Loader />}
            <div ref={mapElementRef} id="map" className={styles.map} />
            <ParentBottomSheet childrenData={childrenData} />
        </div>
    );
}

const query = "parent/pickup/now";
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
        content,
        size: new naver.maps.Size(20, 20),
        origin: new naver.maps.Point(16, 16)
        // anchor: new naver.maps.Point(25, 26)
    }
};

function getChildrenData() {
    const location = useLocation();
    return location.state.childrenData;
}
