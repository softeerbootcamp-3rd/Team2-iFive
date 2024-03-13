import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Search.module.scss";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { AddressForm } from "./AddressForm/AddressForm";
import { DayList } from "./DayList/DayList";
import { TimeList } from "./TimeList/TimeList";
import { Modal } from "@/components/Modal/Modal";
import { useModal } from "@/hooks/useModal";
import { AddressFinderMap } from "./AddressFinderMap/AddressFinderMap";

export default function Search() {
    const [schedule, setSchedule] = useState({});
    const [mapType, setMapType] = useState("departure");
    const [detailAddress, setDetailAddress] = useState({
        departure: "",
        destination: ""
    });
    // const [location, setLocation] = useState({
    //     departure: { ...INITIAL_LOCATIION_STATE },
    //     destination: { ...INITIAL_LOCATIION_STATE }
    // });

    const [location, dispatch] = useReducer(locationReducer, {
        departure: { ...INITIAL_LOCATION_STATE },
        destination: { ...INITIAL_LOCATION_STATE }
    });

    const navigate = useNavigate();

    const { isVisible, open: openModal, close: closeModal } = useModal();

    const handleOpenModal = ({ target: { name } }) => {
        setMapType(name);
        openModal();
    };

    // const handleLocationSelect = (data) => {
    //     setLocation((prevLocation) => ({
    //         ...prevLocation,
    //         [mapType]: data
    //     }));
    // };

    const handleLocationSelect = (data, mapType) => {
        dispatch({ type: mapType, payload: data });
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

    const handleDetailAddressChange = ({ target: { value } }) => {
        setDetailAddress((prev) => ({
            ...prev,
            [mapType]: value
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
                    animationType="slideDown"
                >
                    <div className={styles.modalContainer}>
                        <AddressFinderMap
                            handleLocationSelect={handleLocationSelect}
                            mapType={mapType}
                        />
                        <div className={styles.addressWrapper}>
                            <label htmlFor="address">
                                {mapType === "departure" ? "출발지" : "도착지"}
                            </label>
                            <input
                                name="address"
                                className={styles.address}
                                type="text"
                                value={location[mapType].address}
                                placeholder="지도를 이동해 주세요"
                                readOnly
                            />
                            <label htmlFor="detailAddress">상세주소</label>
                            <input
                                name="detailAddress"
                                className={styles.address}
                                type="text"
                                value={detailAddress[mapType]}
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

const INITIAL_LOCATION_STATE = {
    address: "",
    latitude: "",
    longitude: ""
};

const locationReducer = (state, action) => {
    switch (action.type) {
        case "departure":
            return {
                ...state,
                departure: action.payload
            };
        case "destination":
            return {
                ...state,
                destination: action.payload
            };
        default:
            return state;
    }
};
