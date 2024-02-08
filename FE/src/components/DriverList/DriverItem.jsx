import styles from "./DriverItem.module.scss";

export function DriverItem({
    name,
    career,
    rating,
    ratingCnt,
    imgSrc,
    introduce
}) {
    return (
        <article className={styles.item}>
            <div className={styles.info}>
                <div className={styles.profile}>
                    <h4 className={styles.name}>{name}</h4>
                    <h6 className={styles.infoText}>{career}</h6>
                    <h6 className={styles.infoText}>
                        ⭐️{rating}/5.0({ratingCnt})
                    </h6>
                </div>
                {/* <img src="" alt="" className={styles.img} /> */}
                <div className={styles.img}>기사님 사진</div>
            </div>
            <p className={styles.introduce}>{introduce}</p>
        </article>
    );
}
