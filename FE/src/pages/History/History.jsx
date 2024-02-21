import { Header } from "../../components/common/Header/Header";
import styles from "./History.module.scss";
import { fakeHistoryData } from "../../service/mockdata";
import { HistoryItem } from "./HistoryItem/HistoryItem";
import { getSubscriptionHistoryList } from "./api";
import { useLocation } from "react-router-dom";

export default function History() {
    const historyListData = useLocation();

    const contentElement = historyListData.map((historyData) => (
        <HistoryItem key={historyData.pickUpInfoId} historyData={historyData} />
    ));

    return (
        <div className={styles.container}>
            <Header title="이용내역" />
            <main className={styles.content}>{contentElement}</main>
        </div>
    );
}

export async function loader() {
    const response = await getSubscriptionHistoryList();
    return response;
}
