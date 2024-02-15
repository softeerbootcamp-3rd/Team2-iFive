import { useSearchParams } from "react-router-dom";
import { DriverMap } from "../../components/Map/DriverMap";
import ParentMap from "../../components/Map/ParentMap";

export function Location() {
    const [query] = useSearchParams();
    const type = query.get("type");
    const render = type == "driver" ? <DriverMap /> : <ParentMap />;

    return <>{render}</>;
}
