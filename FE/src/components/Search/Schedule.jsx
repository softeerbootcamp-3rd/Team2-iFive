import { TimeItem } from "@/components/Search/TimeItem";
import { SEARCH_PAGE } from "../../constants/constants";
import styles from "./Schedule.module.scss";
import { LabelledList } from "../common/Layout/LabelledList";

export function Schedule({ timeList, setTimeList }) {
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

    const filteredTimeItems = SEARCH_PAGE.WEEK.filter(
        (day) => timeList[day] === true
    );

    const timeListElement = filteredTimeItems.length ? (
        filteredTimeItems.map((day, index) => (
            <TimeItem day={day} key={`day-${index}`} />
        ))
    ) : (
        <li className={styles.timeEmpty}>픽업 요일을 선택해주세요</li>
    );

    return (
        <>
            <LabelledList articleStyle="dayBox" label="픽업 요일">
                {dayListElement}
            </LabelledList>
            <LabelledList articleStyle="time" label="픽업 시간">
                {timeListElement}
            </LabelledList>
        </>
    );
}
