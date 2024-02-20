import { useLocation } from "react-router-dom";
import styles from "./kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function DriverContents({
    childName,
    childImage,
    startAddress,
    endAddress,
    pickUpStartTime,
    pickUpEndtime
}) {
    return (
        <>
            <h3>오늘의 픽업</h3>
            <div className={styles.content}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <span>{childName}</span>
                    <span>
                        {pickUpStartTime || "2024.02.01"} ~{" "}
                        {pickUpEndtime || "2024.02.28"}
                    </span>
                    <span>
                        {startAddress} {"→"} {endAddress}
                    </span>
                </div>
            </div>
        </>
    );
}

export function ParentContents({ kidData }) {
    const { pathname } = useLocation();

    const renderContents = kidData.map(
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
                pathname === "/map"
                    ? `${pickUpStartTime} ~ ${pickUpEndTime}`
                    : `${startDate} ~ ${endDate}`;
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
    return (
        <>
            <h3>픽업 서비스 구독 중</h3>
            {renderContents}
        </>
    );
}
