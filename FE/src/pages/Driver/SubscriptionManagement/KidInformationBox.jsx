import { ScheduleList } from "../../../components/Schedule/ScheduleList";
import { transformSchedule } from "../../Parents/History/HistoryItem/transformSchedule";
import { removeCityPrefix } from "../../../utils/parseData";
import styles from "./SubscriptionManagement.module.scss";
import iDrop from "@/assets/iDropGreen.svg";

export function KidInformationBox({
    subscripData: {
        pickUpInfoId,
        childImage,
        childName,
        childBirth,
        childGender,
        startDate,
        endDate,
        startAddress,
        endAddress,
        parentName,
        parentPhoneNumber,
        status,
        schedule
    },
    fetchData
}) {
    startAddress = removeCityPrefix(startAddress);
    endAddress = removeCityPrefix(endAddress);
    schedule = transformSchedule(schedule);

    const handleSubscription = async (pickUpId, status) => {
        const postData = {
            pickUpInfoId: pickUpId,
            statusCode: status
        };
        await postSubscribeRequest(postData);
        fetchData();
    };

    return (
        <div className={styles.content}>
            <div className={styles.kidInfo}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <div className={styles.profiles}>
                        <span className={styles.name}>{childName}</span>
                        <div
                            className={`${styles.status} ${status === "대기" ? styles.waiting : styles.accept}`}
                        >
                            {status}
                        </div>
                    </div>
                    <span className={styles.birthDay}>
                        {childGender}, {childBirth}
                    </span>

                    <span>
                        {startDate} ~ {endDate}
                    </span>
                    <span>
                        {parentName} / {parentPhoneNumber}
                    </span>
                </div>
            </div>
            <div>
                <span>
                    {startAddress} <br /> {"→"} {endAddress}
                </span>
            </div>
            <ScheduleList schedule={schedule} status={status} />
            <div className={styles.btnBox}>
                {status !== "승인" && (
                    <>
                        <button
                            className={styles.denyButton}
                            onClick={() =>
                                handleSubscription(
                                    pickUpInfoId,
                                    statusCode.refuse
                                )
                            }
                        >
                            거절
                        </button>
                        <button
                            className={styles.acceptButton}
                            onClick={async () => {
                                await handleSubscription(
                                    pickUpInfoId,
                                    statusCode.accept
                                );
                                console.log("리로드!!!");
                            }}
                        >
                            수락
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

const statusCode = {
    accept: 1,
    refuse: 0
};