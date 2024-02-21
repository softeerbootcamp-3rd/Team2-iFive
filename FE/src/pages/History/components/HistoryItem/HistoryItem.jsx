import styles from "./HistoryItem.module.scss";
import downArrowIcon from "@/assets/downArrow.svg";

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

    const scheduleListElement = schedule.map((scheduleData) => (
        <ScheduleItem key={scheduleData.day} scheduleData={scheduleData} />
    ));

    return (
        <section className={styles.historyItem}>
            <div className={styles.driverInfo}>
                <div className={styles.driverInfoText}>
                    <div className={styles.driverNameWrapper}>
                        <span className={styles.driverName}>{driverName}</span>
                        <div className={styles.pickupStatus}>{status}</div>
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
            <ul className={styles.scheduleList}>{scheduleListElement}</ul>
            <img src={downArrowIcon} alt="아래 화살표" />
        </section>
    );
}

function ScheduleItem({ scheduleData }) {
    return (
        <li
            className={styles.scheduleItem}
        >{`${scheduleData.day} ${scheduleData.hour}:${scheduleData.min}`}</li>
    );
}

function transformSchedule(schedule) {
    const daysInfo = {
        Mon: { order: 1, translation: "월" },
        Tue: { order: 2, translation: "화" },
        Wed: { order: 3, translation: "수" },
        Thu: { order: 4, translation: "목" },
        Fri: { order: 5, translation: "금" },
        Sat: { order: 6, translation: "토" },
        Sun: { order: 7, translation: "일" }
    };

    const makeScheduleObject = (day) => ({
        day,
        min: schedule[day].min,
        hour: schedule[day].hour
    });

    const translateDay = (schedule) => ({
        ...schedule,
        day: daysInfo[schedule.day].translation
    });

    const sortByDay = (a, b) => daysInfo[a.day].order - daysInfo[b.day].order;

    const scheduleArray = Object.keys(schedule).map(makeScheduleObject);
    scheduleArray.sort(sortByDay);
    const translatedScheduleArray = scheduleArray.map(translateDay);

    return translatedScheduleArray;
}

function formatHistoryData(data) {
    return { ...data, schedule: transformSchedule(data.schedule) };
}
