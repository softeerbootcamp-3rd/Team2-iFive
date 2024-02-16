import styles from "./DayList.module.scss";
import { LabelledList } from "../common/Layout/LabelledList";
import { SEARCH_PAGE } from "../../constants/constants";

export function DayList({ schedule, setSchedule }) {
    const handleWeekClick = (day) => {
        setSchedule((prevTimeList) => {
            return {
                ...prevTimeList,
                [day]: !prevTimeList[day]
            };
        });
    };

    const dayListElement = SEARCH_PAGE.WEEK.map((day) => (
        <li
            key={day}
            className={`${styles.dayItem} ${
                schedule[day] !== false && styles.active
            }`}
            onClick={(event) => handleWeekClick(day, event)}
        >
            <p>{day[0]}</p>
        </li>
    ));

    return (
        <LabelledList articleStyle="dayBox" label="픽업 요일">
            {dayListElement}
        </LabelledList>
    );
}
