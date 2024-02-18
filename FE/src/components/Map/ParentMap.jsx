import styles from "./map.module.scss";
import { useEffect, useRef } from "react";
import { useCoords } from "../../hooks/useCoords";
import { getLatLng } from "../../utils/map";
import { useMap } from "../../hooks/useMap";
import { Loader } from "../common/Loader/Loader";
import { ParentBottomSheet } from "../common/Bottomsheet/Bottomsheet";
import { PARENT_TOKEN, WEBSOCKET_URL } from "../../constants/constants";
import { useMarker } from "../../hooks/useMarker";
import { useFetchGet } from "../../hooks/useFetch";
import { getAccessToken } from "../../utils/auth";

export default function ParentMap() {
    const [kidData, setKidData] = useFetchGet(query, header);
    const { loading, error, data } = kidData;

    const mapElementRef = useRef();

    const {
        location: { latitude, longitude },
        isLoading: locationLoading
    } = useCoords();

    const center =
        !locationLoading &&
        getLatLng(exampleData.startLatitude, exampleData.startLongitude);

    const map = useMap(mapElementRef, { center }, locationLoading);

    const departureMarker = useMarker(map, center);
    const driverMarker = useMarker(map, center);

    const destinationPos = getLatLng(
        exampleData.endLatitude,
        exampleData.endLongitude
    );
    const destinationMarker = useMarker(map, destinationPos);

    const webSocketRef = useRef();

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
            {loading ? <Loader /> : <ParentBottomSheet data={exampleData} />}
        </div>
    );
}

const query = "parent/pickup/now";
const accessToken = getAccessToken();
const header = {
    Bearer: accessToken
};

const exampleData = {
    childName: "김하나",
    childImage: "String...",
    startAddress: "에티버스러닝 학동캠퍼스",
    endAddress: "코마츠",
    startDate: "2024.02.01",
    endDate: "2024.02.29",
    startTime: "09:00",
    endTime: "10:00",
    startLatitude: 37.5138649,
    startLongitude: 127.0295296,
    endLatitude: 37.51559,
    endLongitude: 127.0316161
};
