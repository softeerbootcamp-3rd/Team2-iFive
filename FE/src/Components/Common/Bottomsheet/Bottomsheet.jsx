import { useState } from "react";
import styles from "./bottomsheet.module.scss";
import { KidInfo } from "./kidInfoBox";
export function BottomSheet({ data }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleBottomSheet = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            onClick={toggleBottomSheet}
            className={`${styles.wrapper} ${isExpanded ? styles.expanded : ""}`}
        >
            <header>
                <div className={styles.handle}></div>
            </header>
            <h3>픽업 서비스 구독 중</h3>
            <hr />
            <KidInfo data={data}></KidInfo>
        </div>
    );
}
