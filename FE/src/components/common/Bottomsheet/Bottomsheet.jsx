import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./bottomsheet.module.scss";
import { KidInfo } from "./kidInfoBox";
import { userType } from "../../../constants/constants";
import { Footer } from "../Footer/Footer";

export function BottomSheet({ childData, userRole }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleBottomSheet = () => {
        setIsExpanded(!isExpanded);
    };

    const navigate = useNavigate();
    const movePage = () => {
        navigate("/pickup", { state: { flag: true } });
    };

    const renderButton = () => {
        if (userRole == userType.driver) {
            return <Footer text={"운행 종료"} onClick={movePage} />;
        }
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
            <div className={styles.list}>
                <KidInfo childData={childData}></KidInfo>
                <KidInfo childData={childData}></KidInfo>
            </div>
            {renderButton()}
        </div>
    );
}
