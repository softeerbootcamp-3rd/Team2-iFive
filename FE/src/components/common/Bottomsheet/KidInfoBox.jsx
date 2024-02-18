import { useLocation } from "react-router-dom";
import styles from "./kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function KidInfoComponent({
    childName,
    childImage,
    startAddress,
    endAddress,
    startDate,
    endDate
}) {
    return (
        <div className={styles.content}>
            <img className={styles.kidImg} src={childImage || iDrop}></img>
            <div className={styles.infoBox}>
                <span>{childName}</span>
                <span>
                    {startDate || "7:00"} ~ {endDate || "8:00"}
                </span>
                <span>
                    {startAddress} {"→"} {endAddress}
                </span>
            </div>
        </div>
    );
}

export function DriverContents({
    childName,
    childImage,
    startAddress,
    endAddress,
    startTime,
    endTime
}) {
    return (
        <>
            <h3>오늘의 픽업</h3>
            <div className={styles.content}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <span>{childName}</span>
                    <span>
                        {startTime || "2024.02.01"} ~ {endTime || "2024.02.28"}
                    </span>
                    <span>
                        {startAddress} {"→"} {endAddress}
                    </span>
                </div>
            </div>
        </>
    );
}

export function ParentContents({
    childName,
    childImage,
    startAddress,
    endAddress,
    startDate,
    endDate,
    startTime,
    endTime
}) {
    const { pathname } = useLocation();
    const MSG =
        pathname === "/map"
            ? `${startTime} ~ ${endTime}`
            : `${startDate} ~ ${endDate}`;
    return (
        <>
            <h3>픽업 쏴비수 구독 중</h3>
            <div className={styles.content}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <span>{childName}</span>
                    <span>{MSG}</span>
                    <span>
                        {startAddress} {"→"} {endAddress}
                    </span>
                </div>
            </div>
        </>
    );
}
