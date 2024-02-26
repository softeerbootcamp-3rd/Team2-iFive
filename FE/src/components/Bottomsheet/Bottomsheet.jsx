import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Bottomsheet.module.scss";
import { DriverContents, ParentContents } from "./KidInfoBox/KidInfoBox";
import { Footer } from "../Footer/Footer";

export function ParentBottomSheet({ childrenData }) {
    const { headerMsg, isHaveData } = checkData(childrenData);

    return (
        <BttmSheetTemplate headerMsg={headerMsg}>
            {isHaveData && <ParentContents childrenData={childrenData} />}
        </BttmSheetTemplate>
    );
}

export function DriverBottomSheet({ childrenData }) {
    const { pathname } = useLocation();
    const { headerMsg, isHaveData } = checkData(childrenData);

    const navigate = useNavigate();
    const movePage = () => {
        navigate("/pickup", {
            state: { flag: true, childrenData: childrenData }
        });
    };
    return (
        <BttmSheetTemplate headerMsg={headerMsg}>
            {isHaveData && (
                <DriverContents childrenData={childrenData}></DriverContents>
            )}
            {pathname === "/map" ? (
                <Footer text={"운행종료"} onClick={movePage} />
            ) : (
                ""
            )}
        </BttmSheetTemplate>
    );
}

function BttmSheetTemplate({ children, headerMsg }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleBottomSheet = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            onClick={toggleBottomSheet}
            className={`${styles.wrapper} ${isExpanded ? styles.expanded : ""}`}
        >
            <header className={styles.headLine}>
                <div className={styles.handle}></div>
                <span className={styles.headMessage}>{headerMsg}</span>
            </header>
            <div className={styles.container}>{children}</div>
        </div>
    );
}

function checkData(childrenData) {
    const isHaveData = childrenData.length > 0 ? true : false;
    const headerMsg = isHaveData ? "오늘의 픽업" : "오늘은 픽업이 없습니다";
    return { headerMsg, isHaveData };
}
