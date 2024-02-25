import { useNavigate } from "react-router-dom";
import styles from "./ContentsBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function TodayPickUpList({ childrenData }) {
    const navigator = useNavigate();
    const movePage = (index) => {
        navigator("/pickup", { state: childrenData[index] });
    };

    const render = childrenData.map(
        (
            {
                childId,
                childImage,
                childName,
                pickUpStartTime,
                pickUpEndTime,
                startAddress,
                endAddress
            },
            index
        ) => {
            return (
                <div key={index} className={styles.content}>
                    <img
                        className={styles.kidImg}
                        src={childImage || iDrop}
                    ></img>
                    <div className={styles.infoBox}>
                        <div>
                            <span> {childName} </span>
                            <button onClick={() => movePage(index)}>
                                픽업시작
                            </button>
                        </div>
                        <span>
                            {pickUpStartTime} ~ {pickUpEndTime}
                        </span>
                        <span>
                            {startAddress}
                            <br /> {"→"} {endAddress}
                        </span>
                    </div>
                </div>
            );
        }
    );
    return render;
}
