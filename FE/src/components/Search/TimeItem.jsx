import { NumericSelector } from "../common/Input/NumericSelector";
import styles from "./TimeItem.module.scss";
import React from "react";

export function TimeItem({ day }) {
    return (
        <li className={styles.timeItem}>
            <h6 className={styles.timeDay}>{day}</h6>
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
                    />
                    <NumericSelector
                        start={0}
                        end={50}
                        step={10}
                        targetLength={2}
                        padChar="0"
                        defaultValue="10"
                        unit="분"
                    />
                </div>
            </form>
        </li>
    );
}
