import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.scss";
import { Header } from "@/components/common/Header/Header";
import { Footer } from "@/components/common/Footer/Footer";
import { Modal } from "@/components/Search/Modal";
import { AddressForm } from "@/components/Search/AddressForm";
import { DayList } from "../../components/Search/DayList";
import { TimeList } from "../../components/Search/TimeList";
import { fetchDrivers } from "../../service/api";

const INITIAL_LOCATIION_STATE = {
    address: "",
    latitude: "",
    longitude: ""
};

export default function Search() {
    const [schedule, setSchedule] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [mapFor, setMapFor] = useState("");
    const [detailAddress, setDetailAddress] = useState({
        departure: "",
        destination: ""
    });

    const [location, setLocation] = useState({
        departure: { ...INITIAL_LOCATIION_STATE },
        destination: { ...INITIAL_LOCATIION_STATE }
    });

    const navigate = useNavigate();

    const handleOpenModal = ({ target: { name } }) => {
        setMapFor(name);

        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    // 상위에서 이렇게 함수를 만들어서 넘겨주는게 좋은지 set함수만 넘기고 사용하는 곳에서 함수로 만드는 것이 좋은지 모르겠음
    const handleLocationSelect = (data) => {
        setLocation((prevLocation) => ({
            ...prevLocation,
            [mapFor]: data
        }));
    };

    const handleScheduleChange = (day, unit) => (value) => {
        setSchedule((prevSchedule) => ({
            ...prevSchedule,
            [day]: { ...prevSchedule[day], [unit]: value }
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
                    mapFor={mapFor}
                    isOpen={modalOpen}
                    onClose={handleCloseModal}
                    location={location}
                    handleLocationSelect={handleLocationSelect}
                    detailAddress={detailAddress}
                    setDetailAddress={setDetailAddress}
                />
            </main>
        </>
    );
}
