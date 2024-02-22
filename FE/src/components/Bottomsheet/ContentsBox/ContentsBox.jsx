import { useLocation, useNavigate } from "react-router-dom";
import styles from "../KidInfoBox/kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function ContentsBox({
    childId,
    childImage,
    childName,
    pickUpStartTime,
    pickUpEndTime,
    startAddress,
    endAddress,
    startDate,
    endDate,
    type
}) {
    const { pathname } = useLocation();

    let timeMsg =
        type === "parent"
            ? pathname === "/map"
                ? `${pickUpStartTime} ~ ${pickUpEndTime}`
                : `${startDate} ~ ${endDate}`
            : `${pickUpStartTime} ~ ${pickUpEndTime}`;
    return (
        <div className={styles.content}>
            <img className={styles.kidImg} src={childImage || iDrop}></img>
            <div className={styles.infoBox}>
                <span> {childName} </span>
                <span>{timeMsg}</span>
                <span>
                    {startAddress} <br /> {"→"} {endAddress}
                </span>
            </div>
        </div>
    );
}
