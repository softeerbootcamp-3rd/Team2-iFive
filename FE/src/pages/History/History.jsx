import { Header } from "../../components/common/Header/Header";
import styles from "./History.module.scss";
import { fakeHistoryData } from "../../service/mockdata";
import { HistoryItem } from "./components/HistoryItem/HistoryItem";

export default function History() {
    const contentElement = fakeHistoryData.map((historyData) => (
        <HistoryItem key={historyData.pickUpInfoId} historyData={historyData} />
    ));

    return (
        <div className={styles.container}>
            <Header title="이용내역" />
            <main className={styles.content}>{contentElement}</main>
        </div>
    );
}
