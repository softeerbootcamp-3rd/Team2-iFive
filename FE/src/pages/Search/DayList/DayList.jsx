import styles from "./DayList.module.scss";
import { LabelledList } from "../../../components/common/Layout/LabelledList";
import { SEARCH_PAGE } from "../../../constants/constants";

export function DayList({ schedule, setSchedule }) {
    const handleWeekClick = (day) => {
        setSchedule((prevTimeList) => {
            const newTimeList = { ...prevTimeList };
            if (newTimeList[day]) {
                delete newTimeList[day];
            } else {
                newTimeList[day] = DEFAULT_TIME;
            }
            return newTimeList;
        });
    };

    const dayListElement = SEARCH_PAGE.WEEK.map((day) => (
        <li
            key={day}
            className={`${styles.dayItem} ${schedule[day] && styles.active}`}
            onClick={(event) => handleWeekClick(day, event)}
        >
            <p>{SEARCH_PAGE.WEEK_MAP[day][0]}</p>
        </li>
    ));

    return (
        <LabelledList articleStyle="dayBox" label="픽업 요일">
            {dayListElement}
        </LabelledList>
    );
}

const DEFAULT_TIME = { hour: 8, min: 10 };
