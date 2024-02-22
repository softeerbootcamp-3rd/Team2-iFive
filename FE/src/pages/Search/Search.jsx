import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.scss";
import { Header } from "@/components/common/Header/Header";
import { Footer } from "@/components/common/Footer/Footer";
import { AddressForm } from "@/components/Search/AddressForm";
import { DayList } from "../../components/Search/DayList";
import { TimeList } from "../../components/Search/TimeList";
import { Modal } from "../../components/common/Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { AddressFinderMap } from "../../components/Search/AddressFinderMap";

const INITIAL_LOCATIION_STATE = {
    address: "",
    latitude: "",
    longitude: ""
};

export default function Search() {
    const [schedule, setSchedule] = useState({});
    const [mapFor, setMapFor] = useState("departure");
    const [detailAddress, setDetailAddress] = useState({
        departure: "",
        destination: ""
    });
    const [location, setLocation] = useState({
        departure: { ...INITIAL_LOCATIION_STATE },
        destination: { ...INITIAL_LOCATIION_STATE }
    });
    const navigate = useNavigate();

    const { isVisible, open: openModal, close: closeModal } = useModal();

    const handleOpenModal = ({ target: { name } }) => {
        setMapFor(name);
        openModal();
    };

    const handleLocationSelect = (data) => {
        setLocation((prevLocation) => ({
            ...prevLocation,
            [mapFor]: data
        }));
    };

    const handleScheduleChange = (day, unit) => (value) => {
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: { ...prevSchedule[day], [unit]: Number(value) }
        }));
    };

    function transformLocationData({ departure, destination }) {
        return {
            startAddress: departure.address,
            startLatitude: departure.latitude,
            startLongitude: departure.longitude,
            endAddress: destination.address,
            endLatitude: destination.latitude,
            endLongitude: destination.longitude
        };
    }

    const isButtonActive =
        location.departure.address &&
        location.destination.address &&
        Object.keys(schedule).length > 0;

    const handleSubmit = (isButtonActive, location, schedule) => {
        if (!isButtonActive) {
            return;
        }
        const locationData = transformLocationData(location);
        navigate("/subscription/drivers", {
            state: { ...locationData, schedule }
        });
    };

    const handleAddressChange = async ({ target: { value } }) => {
        setLocation((prevLocation) => ({
            ...prevLocation,
            [mapFor]: { ...prevLocation[mapFor], address: value }
        }));
        // const { address, point } = await searchAddressToCoordinate(value);
    };

    const handleDetailAddressChange = ({ target: { value } }) => {
        setDetailAddress((prev) => ({
            ...prev,
            [mapFor]: value
        }));
    };

    return (
        <>
            <main className={styles.container}>
                <Header title="픽업 신청" to="/" />
                <section className={styles.contents}>
                    <AddressForm
                        handleOpenModal={handleOpenModal}
                        location={location}
                        detailAddress={detailAddress}
                    />
                    <DayList schedule={schedule} setSchedule={setSchedule} />
                    <TimeList
                        schedule={schedule}
                        handleScheduleChange={handleScheduleChange}
                    />
                </section>
                <Footer
                    text="확인"
                    onClick={() =>
                        handleSubmit(isButtonActive, location, schedule)
                    }
                    isButtonDisabled={!isButtonActive}
                />

                <Modal
                    isVisible={isVisible}
                    onClose={closeModal}
                    width="100%"
                    height="100dvh"
                >
                    <div className={styles.modalContainer}>
                        <AddressFinderMap
                            handleLocationSelect={handleLocationSelect}
                        />
                        <div className={styles.addressWrapper}>
                            <label htmlFor="address">
                                {mapFor === "departure" ? "출발지" : "도착지"}
                            </label>
                            <input
                                name="address"
                                className={styles.address}
                                type="text"
                                value={location[mapFor].address}
                                onChange={handleAddressChange}
                                placeholder="지도를 이동해 주세요"
                                readOnly
                            />
                            <label htmlFor="detailAddress">상세주소</label>
                            <input
                                name="detailAddress"
                                className={styles.address}
                                type="text"
                                value={detailAddress[mapFor]}
                                onChange={handleDetailAddressChange}
                                placeholder="상세 주소가 있다면 적어주세요"
                            />
                        </div>
                        <Footer
                            className={styles.closeButton}
                            onClick={closeModal}
                            text="완료"
                        />
                    </div>
                </Modal>
            </main>
        </>
    );
}
