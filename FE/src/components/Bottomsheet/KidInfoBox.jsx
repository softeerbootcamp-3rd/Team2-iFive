import { useLocation } from "react-router-dom";
import styles from "./kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function DriverContents({ childrenData }) {
    const isHaveData = childrenData.length > 0 ? true : false;
    const headerMsg = isHaveData
        ? "오늘의 픽업"
        : "현재 매칭된 픽업이 없습니다";
    return (
        <>
            <span className={styles.headMessage}>{headerMsg}</span>
            {isHaveData && renderContents(childrenData, "driver")}
        </>
    );
}

export function ParentContents({ childrenData }) {
    const isHaveData = childrenData.length > 0 ? true : false;
    const headerMsg = isHaveData
        ? "픽업 서비스 구독 중"
        : "현재 매칭된 픽업이 없습니다";
    return (
        <>
            <span className={styles.headMessage}>{headerMsg}</span>
            {renderContents(childrenData, "parent")}
        </>
    );
}

function renderContents(childrenData, type) {
    const { pathname } = useLocation();

    const render = childrenData.map(
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
            let timeMsg =
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
                        <span>{timeMsg}</span>
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
