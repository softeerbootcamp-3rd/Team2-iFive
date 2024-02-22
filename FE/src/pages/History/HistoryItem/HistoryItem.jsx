import { transformSchedule } from "./transformSchedule";
import styles from "./HistoryItem.module.scss";
import { PICKUP_STATUS_MAP } from "@/constants/constants";
import { ScheduleList } from "@/components/Schedule/ScheduleList";

export function HistoryItem({ historyData }) {
    const {
        driverName,
        driverImage,
        startDate,
        endDate,
        startAddress,
        endAddress,
        status,
        schedule
    } = formatHistoryData(historyData);

    return (
        <section className={styles.historyItem}>
            <div className={styles.driverInfo}>
                <div className={styles.driverInfoText}>
                    <div className={styles.driverNameWrapper}>
                        <span className={styles.driverName}>{driverName}</span>
                        <div
                            className={`${styles.pickupStatus} ${
                                styles[PICKUP_STATUS_MAP[status]]
                            }`}
                        >
                            {status}
                        </div>
                    </div>
                    <span
                        className={styles.period}
                    >{`${startDate} ~ ${endDate}`}</span>
                    <span className={styles.departure}>{startAddress}</span>
                    <span className={styles.destination}>
                        {`➡️ ${endAddress}`}
                    </span>
                </div>
                <img
                    className={styles.driverImg}
                    // src={driverImage}
                    src=""
                    alt="기사님 사진"
                />
            </div>
            <ScheduleList schedule={schedule} status={status} />
        </section>
    );
}

function formatHistoryData(data) {
    return { ...data, schedule: transformSchedule(data.schedule) };
}
