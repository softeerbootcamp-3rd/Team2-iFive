import styles from "./kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function ContentsBox({
    childId,
    childImage,
    childName,
    pickUpStartTime,
    pickUpEndTime,
    startAddress,
    endAddress
}) {
    return (
        <div className={styles.content}>
            <img className={styles.kidImg} src={childImage || iDrop}></img>
            <div className={styles.infoBox}>
                <span> {childName} </span>
                <span>
                    {pickUpStartTime} ~ {pickUpEndTime}
                </span>
                <span>
                    {startAddress} <br /> {"→"} {endAddress}
                </span>
            </div>
        </div>
    );
}
