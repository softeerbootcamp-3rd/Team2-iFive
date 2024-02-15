import styles from "./DayList.module.scss";
import { LabelledList } from "../common/Layout/LabelledList";
import { SEARCH_PAGE } from "../../constants/constants";

export function DayList({ timeList, setTimeList }) {
    const handleWeekClick = (day) => {
        setTimeList((prevTimeList) => {
            return {
                ...prevTimeList,
                [day]: !prevTimeList[day]
            };
        });
    };

    const dayListElement = SEARCH_PAGE.WEEK.map((day) => (
        <li
            key={day}
            className={`${styles.dayItem} ${timeList[day] && styles.active}`}
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
