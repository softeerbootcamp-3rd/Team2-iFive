import styles from "./TimeItem.module.scss";

export function TimeItem({ day }) {
    return (
        <li className={styles.timeItem}>
            <h6 className={styles.timeDay}>{day}</h6>
            <form className={styles.timeForm}>
                <div className={styles.timeWrapper}>
                    <input type="text" className={styles.timeInput} />
                    <label className={styles.timeSuffix}>시</label>
                    <input type="text" className={styles.timeInput} />
                    <label className={styles.timeSuffix}>분</label>
                </div>
            </form>
        </li>
    );
}
