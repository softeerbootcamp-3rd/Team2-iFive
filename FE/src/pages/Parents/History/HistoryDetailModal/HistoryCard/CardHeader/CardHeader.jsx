import styles from "./CardHeader.module.scss";

export function CardHeader({ date, time, driverImage, driverName, status }) {
    return (
        <header className={styles.cardHeader}>
            <div className={styles.cardHeaderImgWrapper}>
                <img src={driverImage} alt="driver-profile" />
            </div>
            <div className={styles.cardHeaderInfo}>
                <h4 className={styles.cardHeaderInfoTitle}>{driverName}</h4>
                <span
                    className={styles.cardHeaderInfoTime}
                >{`${date} ${time} ${status}`}</span>
            </div>
        </header>
    );
}
