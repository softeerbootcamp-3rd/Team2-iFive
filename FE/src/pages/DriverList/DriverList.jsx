import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/common/Header/Header";
import { DriverListItem } from "@/components/DriverList/DriverListItem";
import styles from "./DriverList.module.scss";
import { fetchDrivers } from "../../service/api";

export default function DriverList() {
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const handleItemClick = (id) => {
        navigate(`/subscription/driver/${id}`);
    };

    useEffect(() => {
        (async () => {
            const data = await fetchDrivers(location.state);
            setDrivers(data.drivers);
        })();
    }, [location.state]);

    return (
        <main className={styles.container}>
            <Header title="기사님 목록" />
            <section className={styles.list}>
                {drivers?.map((data) => (
                    <DriverListItem
                        key={data.driverId}
                        data={data}
                        handleClick={handleItemClick}
                    />
                ))}
            </section>
        </main>
    );
}
