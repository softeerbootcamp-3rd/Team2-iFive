import styles from "./DayList.module.scss";
import { LabelledList } from "@/components/Layout/LabelledList";
import { SEARCH_PAGE } from "@/constants/constants";

export function DayList({ schedule, handleWeekClick }) {
    const dayListElement = SEARCH_PAGE.WEEK.map((day) => {
        const dayAbbreviation = SEARCH_PAGE.WEEK_MAP[day][0];

        return (
            <li
                key={day}
                className={`${styles.dayItem} ${schedule[day] && styles.active}`}
                onClick={() => handleWeekClick(day)}
            >
                <p>{dayAbbreviation}</p>
            </li>
        );
    });

    return (
        <LabelledList articleStyle="dayBox" label="픽업 요일">
            {dayListElement}
        </LabelledList>
    );
}
