import styles from "./map.module.scss";
import { useEffect, useRef, useState } from "react";
import { useCoords } from "../../hooks/useCoords";
import { getLatLng } from "../../utils/map";
import { useMap } from "../../hooks/useMap";
import { Loader } from "../common/Loader/Loader";
import { BottomSheet } from "../common/Bottomsheet/Bottomsheet";
import { PARENT_TOKEN, WEBSOCKET_URL } from "../../constants/constants";
import { getKidInfo } from "../../service/api";
import { useMarker } from "../../hooks/useMarker";

const childData = {
    name: "육 아들",
    time: "7:00~8:00",
    start: "서울 시청",
    goal: "국민대"
};

const state = {
    loading: "loading",
    success: "success",
    error: "error"
};

export default function ParentMap() {
    const [pickUpData, setPickUpdata] = useState();
    const [apiState, setApiState] = useState(state.loading);

    const getData = async () => {
        try {
            const response = await getKidInfo();
            setApiState(state.success);
            setPickUpdata(response);
        } catch (error) {
            setApiState(state.error);
            console.error(error);
        }
    };

    const mapElementRef = useRef();
    const {
        location: { latitude, longitude },
        isLoading
    } = useCoords();

    const center = !isLoading && getLatLng(latitude, longitude);
    const map = useMap(mapElementRef, { center }, isLoading);

    const webSocketRef = useRef();

    const driverPosition = getLatLng(37.5142677, 127.0295545);
    const driverMarker = useMarker(map, driverPosition);

    useEffect(() => {
        if (!driverMarker) return;
        webSocketRef.current = new WebSocket(WEBSOCKET_URL, [PARENT_TOKEN]);

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
            <BottomSheet childData={childData}></BottomSheet>
        </div>
    );
}
