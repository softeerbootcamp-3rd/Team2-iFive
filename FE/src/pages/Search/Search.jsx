import { useState } from "react";
import styles from "./Search.module.scss";
import { Header } from "@/components/common/Header/Header";
import { Footer } from "@/components/common/Footer/Footer";
import { Modal } from "@/components/Search/Modal";
import { SEARCH_PAGE } from "@/constants/constants";
import { AddressForm } from "@/components/Search/AddressForm";
import { DayList } from "../../components/Search/DayList";
import { TimeList } from "../../components/Search/TimeList";

export default function Search() {
    const [timeList, setTimeList] = useState(SEARCH_PAGE.DEFAULT_TIME_LIST);
    const [modalOpen, setModalOpen] = useState(false);
    const [mapType, setMapType] = useState("");

    const handleOpenModal = ({ target: { name } }) => {
        setMapType(name);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <main className={styles.container}>
                <Header title="픽업 신청" />
                <section className={styles.contents}>
                    <AddressForm handleOpenModal={handleOpenModal} />
                    <DayList {...{ timeList, setTimeList }} />
                    <TimeList {...{ timeList, setTimeList }} />
                </section>
                <Footer text="확인" />
                <Modal
                    type={mapType}
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                />
            </main>
        </>
    );
}
