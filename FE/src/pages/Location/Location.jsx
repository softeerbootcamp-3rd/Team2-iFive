import { useSearchParams } from "react-router-dom";
import { DriverMap } from "../../components/Map/DriverMap";

export function Location() {
    const [query] = useSearchParams();
    const type = query.get("type");
    const render = type == "driver" ? <DriverMap /> : <DriverMap />;

    return <>{render}</>;
}
