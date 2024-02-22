import styles from "./DriverListItem.module.scss";

export function DriverListItem({
    data: {
        driverId,
        name,
        gender,
        starRate,
        numberOfReviews,
        imgSrc,
        introduction
    },
    handleClick
}) {
    return (
        <article onClick={() => handleClick(driverId)} className={styles.item}>
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
