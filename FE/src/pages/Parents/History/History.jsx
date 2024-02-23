import { Header } from "@/components/Header/Header";
import styles from "./History.module.scss";
import { HistoryItem } from "./HistoryItem/HistoryItem";
import { redirect, useSearchParams } from "react-router-dom";
import { Modal } from "@/components/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { HistoryDetail } from "./HistoryDetailModal/HistoryDetail";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";

export default function History() {
    const {
        loading,
        data: historyListData,
        error
    } = useFetch("/parent/subscribe/list");
    if (error) {
        // TODO 404로 보내기
        redirect("/");
    }
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

    const contentElement = historyListData?.map((historyData) => (
        <HistoryItem
            key={historyData.pickUpInfoId}
            historyData={historyData}
            handleHistoryItemClick={handleHistoryItemClick}
        />
    ));

    return (
        <div className={styles.container}>
            <Header title="이용내역" />
            <main className={styles.content}>
                {loading ? "loading..." : contentElement}
            </main>
            <Modal isVisible={isVisible} animationType="slideLeft">
                <HistoryDetail
                    driverProfile={driverProfile}
                    closeModal={closeModal}
                />
            </Modal>
        </div>
    );
}
