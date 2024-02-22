import { Header } from "@/components/Header/Header";
import styles from "./HistoryDetail.module.scss";
import { useFetch } from "../../../../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

export function HistoryDetail({ driverProfile, closeModal }) {
    const [searchParams] = useSearchParams();
    const searchParam = searchParams.get("pickup");
    const fetchUrl = searchParam && `/parent/history/${searchParam}`;
    const { loading, error, data: detailHistoryData } = useFetch(fetchUrl);

    const cardListElement =
        detailHistoryData?.data?.length > 0 ? (
            detailHistoryData.data.map((cardData) => (
                <HistoryCard
                    cardData={cardData}
                    driverProfile={driverProfile}
                />
            ))
        ) : (
            <EmptyHistoryCard />
        );
    return (
        <div className={styles.container}>
            <Header title="상세 이용 내역" onClick={closeModal} />
            <main className={styles.cardList}>
                {loading ? "loading..." : cardListElement}
            </main>
        </div>
    );
}

function EmptyHistoryCard() {
    return (
        <section className={styles.emptyHistory}>
            <p className={styles.emptyText}>픽업 구독을 신청해보세요!</p>
        </section>
    );
}

function HistoryCard({ cardData, driverProfile: { driverImage, driverName } }) {
    const { info } = cardData;
    const isPickUpStart = true;
    const getTime = (timeInfo) => {
        const [date, time] = timeInfo.split("T");
        return [date, time];
    };
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

function CardHeader({ date, time, driverImage, driverName, status }) {
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

function CardMain({ img }) {
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
