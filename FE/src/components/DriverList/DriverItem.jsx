import styles from "./DriverItem.module.scss";

export function DriverItem({
    name,
    gender,
    starRate,
    numberOfReviews,
    imgSrc,
    introduction
}) {
    return (
        <article className={styles.item}>
            <div className={styles.info}>
                <div className={styles.profile}>
                    <h4 className={styles.name}>
                        {name}({gender})
                    </h4>
                    <h6 className={styles.infoText}>
                        ⭐️{starRate}/5.0({numberOfReviews})
                    </h6>
                </div>
                <img src={imgSrc} alt="" className={styles.img} />
            </div>
            <p className={styles.introduce}>{introduction}</p>
        </article>
    );
}
