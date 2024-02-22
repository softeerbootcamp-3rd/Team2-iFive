import React from "react";
import styles from "./TimeList.module.scss";
import { LabelledList } from "@/components/Layout/LabelledList";
import { NumericSelector } from "@/components/Input/NumericSelector";
import { SEARCH_PAGE } from "@/constants/constants";

export function TimeList({ schedule, handleScheduleChange }) {
    const filteredTimeItems = SEARCH_PAGE.WEEK.filter(
        (day) => schedule[day] !== undefined
    );

    const timeListElement = filteredTimeItems.length ? (
        filteredTimeItems.map((day, index) => (
            <TimeItem
                key={`day-${index}`}
                day={day}
                handleScheduleChange={handleScheduleChange}
            />
        ))
    ) : (
        <li className={styles.timeEmpty}>픽업 요일을 선택해주세요</li>
    );
    return (
        <LabelledList articleStyle="time" label="픽업 시간">
            {timeListElement}
        </LabelledList>
    );
}

function TimeItem({ day, handleScheduleChange }) {
    const handleHourSelect = handleScheduleChange(day, "hour");
    const handleMinuteSelect = handleScheduleChange(day, "min");
    return (
        <li className={styles.timeItem}>
            <h6 className={styles.timeDay}>{SEARCH_PAGE.WEEK_MAP[day]}</h6>
            <form className={styles.timeForm}>
                <div className={styles.timeWrapper}>
                    <NumericSelector
                        start={0}
                        end={23}
                        step={1}
                        targetLength={2}
                        padChar="0"
                        unit="시"
                        defaultValue="08"
                        handleSelect={handleHourSelect}
                    />
                    <NumericSelector
                        start={0}
                        end={50}
                        step={10}
                        targetLength={2}
                        padChar="0"
                        defaultValue="10"
                        unit="분"
                        handleSelect={handleMinuteSelect}
                    />
                </div>
            </form>
        </li>
    );
}
