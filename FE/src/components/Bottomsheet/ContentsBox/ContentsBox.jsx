import { useLocation, useNavigate } from "react-router-dom";
import styles from "../KidInfoBox/kidInfoBox.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function ContentsBox({ childrenData, type }) {
    const { pathname } = useLocation();
    const isSelectPage = pathname === "/select" ? true : false;
    const navigator = useNavigate();
    const movePage = (index) => {
        navigator("/pickup", { state: childrenData[index] });
    };

    let childrenList = [];
    if (Array.isArray(childrenData)) {
        childrenList = [...childrenData]; // 배열인 경우 복사하여 할당
    } else {
        childrenList = [childrenData]; // 배열이 아닌 경우 배열에 담아 할당
    }

    const render = childrenList.map(
        (
            {
                childId,
                childImage,
                childName,
                pickUpStartTime,
                pickUpEndTime,
                startAddress,
                endAddress,
                startDate,
                endDate
            },
            index
        ) => {
            let timeMsg =
                type === "parent"
                    ? pathname === "/map"
                        ? `${pickUpStartTime} ~ ${pickUpEndTime}`
                        : `${startDate} ~ ${endDate}`
                    : `${pickUpStartTime} ~ ${pickUpEndTime}`;
            return (
                <div key={index} className={styles.content}>
                    <img
                        className={styles.kidImg}
                        src={childImage || iDrop}
                    ></img>
                    <div className={styles.infoBox}>
                        <div>
                            <span> {childName} </span>
                            {isSelectPage ? (
                                <button onClick={() => movePage(index)}>
                                    {" "}
                                    픽업시작{" "}
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
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
