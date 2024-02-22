import styles from "../KidInfoBox/kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function ContentsBox({ childrenData, type }) {
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
