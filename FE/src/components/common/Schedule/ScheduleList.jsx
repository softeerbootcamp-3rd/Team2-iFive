import { PICKUP_STATUS_MAP } from "../../../constants/constants";
import styles from "./ScheduleList.module.scss";

export function ScheduleList({ schedule, status }) {
    const getScheduleElement = (scheduleData) => (
        <ScheduleItem
            key={scheduleData.day}
            scheduleData={scheduleData}
            status={status}
        />
    );
    const scheduleListElement = schedule.map(getScheduleElement);

    return <ul className={styles.scheduleList}>{scheduleListElement}</ul>;
}

function ScheduleItem({ scheduleData, status = "대기중" }) {
    return (
        <li
            className={`${styles.scheduleItem} ${
                styles[PICKUP_STATUS_MAP[status]]
            }`}
        >{`${scheduleData.day} ${scheduleData.hour}:${scheduleData.min}`}</li>
    );
}
