import { CardHeader } from "./CardHeader/CardHeader";
import { CardMain } from "./CardMain/CardMain";
import styles from "./HistoryCard.module.scss";

export function EmptyHistoryCard() {
    return (
        <section className={styles.emptyHistory}>
            <p className={styles.emptyText}>픽업 구독을 신청해보세요!</p>
        </section>
    );
}

export function HistoryCard({
    cardData,
    driverProfile: { driverImage, driverName }
}) {
    const { info } = cardData;
    const isPickUpStart = info.status === "픽업 시작";

    const [date, time] = isPickUpStart
        ? getTime(info.startTime)
        : getTime(info.endTime);

    const kidImg = isPickUpStart ? info.startImage : info.endImage;

    return (
        <section className={styles.card}>
            <CardHeader
                date={date}
                time={time}
                driverImage={driverImage}
                driverName={driverName}
                status={info.status}
            />
            <CardMain img={kidImg} />
        </section>
    );
}

const getTime = (timeInfo) => {
    const [date, time] = timeInfo.split("T");
    return [date, time];
};
