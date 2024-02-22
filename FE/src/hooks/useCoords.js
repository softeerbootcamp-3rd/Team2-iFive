import { useEffect, useState } from "react";
import { DEFAULT_COORDS } from "@/constants/constants";
import { getCurrentLocation } from "@/utils/coords";

export function useCoords() {
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState(DEFAULT_COORDS);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const { latitude, longitude } = await getCurrentLocation();
                setLocation({ latitude, longitude });
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);
    return { location, isLoading, error };
}
