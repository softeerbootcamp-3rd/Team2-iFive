import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/common/Header/Header";
import { DriverItem } from "@/components/DriverList/DriverItem";
import styles from "./DriverList.module.scss";
import { fetchDrivers } from "../../service/api";

export default function DriverList() {
    const [drivers, setDrivers] = useState([]); // API 응답을 저장할 상태
    const location = useLocation();

    useEffect(
        (async () => {
            // API 요청을 보내는 함수

            const data = await fetchDrivers();
            setDrivers(data);
        })(),
        [location.state]
    );

    return (
        <main className={styles.container}>
            <Header title="기사님 목록" />
            <section className={styles.list}>
                {drivers.map((data) => (
                    <DriverItem key={data.id} {...data} />
                ))}
            </section>
        </main>
    );
}
