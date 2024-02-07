import { useEffect } from "react";
import { BottomSheet } from "../../Components/Common/Bottomsheet/Bottomsheet";
import styles from "../Map/map.module.scss";

const mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    scaleControl: true,
    scaleControlOptions: {
        position: naver.maps.Position.TOP_RIGHT
    },
    logoControl: true,
    logoControlOptions: {
        position: naver.maps.Position.TOP_LEFT
    }
};

const marker = (x, y, map) => {
    new naver.maps.Marker({
        position: new naver.maps.LatLng(x, y),
        map: map
    });
};

export default function Map() {
    // TO DO: 추후 custom Hook으로 비즈니스 로직 분리
    useEffect(() => {
        const mapDiv = document.getElementById("map");
        const map = new window.naver.maps.Map(mapDiv, mapOptions);
        // TO DO: 출발지 목적지 좌표값 받아오기
        marker(37.3595704, 127.105399, map);
        marker(37.5666103, 126.9783882, map);
    }, []);

    // TO DO: 서버에서 데이터 받아와야함
    const data = {
        name: "육 아들",
        time: "7:00~8:00",
        start: "서울 시청",
        goal: "국민대"
    };

    return (
        <div className={styles.wrapper}>
            <div id="map" style={{ width: "100%", height: "100%" }} />
            <BottomSheet data={data}></BottomSheet>
        </div>
    );
}
