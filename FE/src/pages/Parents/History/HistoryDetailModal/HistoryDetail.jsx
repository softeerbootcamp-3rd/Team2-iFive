import { Header } from "@/components/Header/Header";
import styles from "./HistoryDetail.module.scss";
import { useFetch } from "@/hooks/useFetch";
import { useSearchParams } from "react-router-dom";
import { EmptyHistoryCard, HistoryCard } from "./HistoryCard/HistoryCard";

export function HistoryDetail({ driverProfile, closeModal }) {
    const [searchParams] = useSearchParams();
    const searchParam = searchParams.get("pickup");
    const fetchUrl = searchParam && `/parent/history/${searchParam}`;
    const { loading, error, data: detailHistoryData } = useFetch(fetchUrl);

    const cardListElement =
        detailHistoryData?.data?.length > 0 ? (
            detailHistoryData.data.map((cardData) => (
                <HistoryCard
                    key={cardData.day}
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
