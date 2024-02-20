import { useLocation } from "react-router-dom";
import styles from "./kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function DriverContents({ kidData }) {
    return (
        <>
            <h3>오늘의 픽업</h3>
            {renderContents(kidData, "driver")}
        </>
    );
}

export function ParentContents({ kidData }) {
    return (
        <>
            <h3>픽업 서비스 구독 중</h3>
            {renderContents(kidData, "parent")}
        </>
    );
}

function renderContents(kidData, type) {
    const { pathname } = useLocation();

    const render = kidData.map(
        ({
            childId,
            childImage,
            childName,
            pickUpStartTime,
            pickUpEndTime,
            startAddress,
            endAddress,
            startDate,
            endDate
        }) => {
            let MSG =
                type === "parent"
                    ? pathname === "/map"
                        ? `${pickUpStartTime} ~ ${pickUpEndTime}`
                        : `${startDate} ~ ${endDate}`
                    : `${pickUpStartTime} ~ ${pickUpEndTime}`;
            return (
                <div key={childId} className={styles.content}>
                    <img
                        className={styles.kidImg}
                        src={childImage || iDrop}
                    ></img>
                    <div className={styles.infoBox}>
                        <span>{childName}</span>
                        <span>{MSG}</span>
                        <span>
                            {startAddress} {"→"} {endAddress}
                        </span>
                    </div>
                </div>
            );
        }
    );
    return render;
}
