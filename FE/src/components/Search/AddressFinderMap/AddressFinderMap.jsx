import { useEffect, useRef, useState } from "react";
import { getCurrentCoords } from "../../../utils/getCurrentLocation";
import styles from "./AddressFinderMap.module.scss";
import { initMap } from "./initMap";

export function AddressFinderMap({ setNewAddress }) {
    const mapElementRef = useRef();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { latitude, longitude } = await getCurrentCoords();
                initMap({
                    latitude,
                    longitude,
                    mapElement: mapElementRef.current,
                    setNewAddress
                });
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            {isLoading && <p>Loading.......</p>}
            <div ref={mapElementRef} id="map" className={styles.map} />
        </div>
    );
}
