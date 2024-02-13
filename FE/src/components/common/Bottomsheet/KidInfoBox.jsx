import styles from "./kidInfoBox.module.scss";

export function KidInfo({ childData: { name, time, start, goal } }) {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.kidImg}>아이사진</div>
                <div className={styles.infoBox}>
                    <span>{name}</span>
                    <span>{time}</span>
                    <span>
                        {start} {"→"} {goal}
                    </span>
                </div>
            </div>
        </>
    );
}
