import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header/Header";
import { DriverListItem } from "./DriverListItem/DriverListItem";
import styles from "./DriverList.module.scss";
import { getDriverList } from "@/service/parentsAPI";

export default function DriverList() {
    const [drivers, setDrivers] = useState([]);
    const { state: subscriptionOption } = useLocation();
    const navigate = useNavigate();
    const handleItemClick = (id) => {
        navigate(`/subscription/driver/${id}`, {});
    };

    useEffect(() => {
        (async () => {
            const data = await getDriverList(subscriptionOption);
            setDrivers(data.drivers);
        })();
    }, [subscriptionOption]);

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
