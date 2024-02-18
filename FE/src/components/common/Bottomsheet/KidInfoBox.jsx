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
