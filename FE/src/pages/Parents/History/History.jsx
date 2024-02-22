import { Header } from "@/components/Header/Header";
import styles from "./History.module.scss";
import { HistoryItem } from "./HistoryItem/HistoryItem";
import { getSubscriptionHistoryList } from "@/service/parentsAPI";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { Modal } from "@/components/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { HistoryDetail } from "./HistoryDetailModal/HistoryDetail";
import { useState } from "react";

export default function History() {
    const historyListData = useLoaderData();
    const { isVisible, open: openModal, close: closeModal } = useModal();
    const [searchParams, setSearchParams] = useSearchParams();
    const [driverProfile, setDriverProfile] = useState({
        driverImage: "",
        driverName: ""
    });
    const handleHistoryItemClick = (id, driverImage, driverName) => {
        searchParams.set("pickup", id);
        setSearchParams(searchParams, { replace: true });
        setDriverProfile({ driverImage, driverName });
        openModal();
    };

    const contentElement = historyListData.map((historyData) => (
        <HistoryItem
            key={historyData.pickUpInfoId}
            historyData={historyData}
            handleHistoryItemClick={handleHistoryItemClick}
        />
    ));

    return (
        <div className={styles.container}>
            <Header title="이용내역" />
            <main className={styles.content}>{contentElement}</main>
            <Modal isVisible={isVisible} animationType="slideLeft">
                <HistoryDetail driverProfile={driverProfile} />
            </Modal>
        </div>
    );
}

export async function loader() {
    const response = await getSubscriptionHistoryList();
    return response;
}
