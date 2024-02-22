import { useRef } from "react";
import styles from "./AddressFinderMap.module.scss";
import { Loader } from "@/components/Loader/Loader";
import { useMap } from "@/hooks/useMap";
import { getLatLng } from "@/utils/map";
import { useMarker } from "@/hooks/useMarker";
import { useCoords } from "@/hooks/useCoords";

export function AddressFinderMap({ handleLocationSelect }) {
    const mapElementRef = useRef();
    const {
        location: { latitude, longitude },
        isLoading: locationLoading
    } = useCoords();

    const center = !locationLoading && getLatLng(latitude, longitude);
    const map = useMap(mapElementRef, { center }, locationLoading);
    const marker = useMarker(map, map?.getCenter());
    addDragEventListener({ map, marker, handleLocationSelect });

    return (
        <div className={styles.container}>
            {!map && <Loader />}
            <div ref={mapElementRef} id="map" className={styles.map} />
        </div>
    );
}

function addDragEventListener({ map, marker, handleLocationSelect }) {
    if (!map || !marker) {
        return;
    }
    naver.maps.Event.addListener(map, "drag", (e) => {
        marker.setPosition(map.getCenter());
    });

    naver.maps.Event.addListener(map, "dragend", (e) => {
        const currentCoords = map.getCenter();
        searchCoordinateToAddress(currentCoords, handleLocationSelect);
    });
}

function searchCoordinateToAddress(latLng, handleLocationSelect) {
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
            const { y: latitude, x: longitude } = latLng;
            const location = {
                address,
                latitude,
                longitude
            };
            handleLocationSelect(location);
        }
    );
}
