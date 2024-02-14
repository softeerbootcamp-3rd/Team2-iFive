import { useRef } from "react";
import styles from "./AddressFinderMap.module.scss";
import { Loader } from "../../common/Loader/Loader";
import { useMap } from "../../../hooks/useMap";
import { getLatLng } from "../../../utils/map";
import { useMarker } from "../../../hooks/useMarker";
import { useCoords } from "../../../hooks/useCoords";

function searchCoordinateToAddress(latLng, setNewAddress) {
    naver.maps.Service.reverseGeocode(
        {
            coords: latLng,
            orders: [
                naver.maps.Service.OrderType.ADDR,
                naver.maps.Service.OrderType.ROAD_ADDR
            ].join(",")
        },
        (status, response) => {
            if (status !== naver.maps.Service.Status.OK) {
                return alert("Something went wrong!");
            }

            const { roadAddress, jibunAddress } = response.v2.address;
            const address = roadAddress ?? jibunAddress;
            setNewAddress(address);
        }
    );
}

function addDragEventListener({ map, marker, setNewAddress }) {
    if (!map || !marker) {
        return;
    }
    naver.maps.Event.addListener(map, "drag", (e) => {
        marker.setPosition(map.getCenter());
    });

    naver.maps.Event.addListener(map, "dragend", (e) => {
        const currentCoords = map.getCenter();
        searchCoordinateToAddress(currentCoords, setNewAddress);
    });
}

export function AddressFinderMap({ setNewAddress }) {
    const mapElementRef = useRef();
    const {
        location: { latitude, longitude },
        isLoading: locationLoading
    } = useCoords();

    const center = !locationLoading && getLatLng(latitude, longitude);

    const map = useMap(mapElementRef, { center }, locationLoading);
    const marker = useMarker(map, map?.getCenter());
    addDragEventListener({ map, marker, setNewAddress });

    return (
        <div className={styles.container}>
            {!map && <Loader />}
            <div ref={mapElementRef} id="map" className={styles.map} />
        </div>
    );
}
