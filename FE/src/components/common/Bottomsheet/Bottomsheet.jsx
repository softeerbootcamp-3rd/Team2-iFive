import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./bottomsheet.module.scss";
import { DriverContents, KidInfoComponent, ParentContents } from "./kidInfoBox";
import { Footer } from "../Footer/Footer";

export function ParentBottomSheet({ data }) {
    return (
        <BttmSheetTemplate>
            <ParentContents {...data} />
        </BttmSheetTemplate>
    );
}

export function DriverBottomSheet({ data }) {
    const { pathname } = useLocation();

    const navigate = useNavigate();
    const movePage = () => {
        navigate("/pickup", { state: { flag: true } });
    };
    return (
        <BttmSheetTemplate>
            <DriverContents {...data}></DriverContents>
            {pathname === "/map" ? (
                <Footer text={"운행종료"} onClick={movePage} />
            ) : (
                ""
            )}
        </BttmSheetTemplate>
    );
}

function BttmSheetTemplate({ children }) {
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
            {children}
        </div>
    );
}
