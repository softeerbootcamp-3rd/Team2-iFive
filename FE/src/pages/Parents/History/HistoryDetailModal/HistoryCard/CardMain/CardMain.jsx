import styles from "./CardMain.module.scss";

export function CardMain({ img }) {
    return (
        <div className={styles.cardContent}>
            <img
                src={img}
                alt="card-content"
                className={styles.cardContentImg}
            />
            <p className={styles.cardContentText}>특이사항 없음</p>
        </div>
    );
}
