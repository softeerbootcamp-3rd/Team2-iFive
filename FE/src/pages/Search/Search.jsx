import { useState } from "react";
import styles from "./Search.module.scss";
import { Header } from "@/components/common/Header/Header";
import { Footer } from "@/components/common/Footer/Footer";
import { TimeItem } from "@/components/Search/TimeItem";
import Modal from "../../components/Search/Modal";
import { useSearchParams } from "react-router-dom";

const weekDays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
];

const DEFAULT_TIME_LIST = weekDays.reduce((acc, cur) => {
    return { ...acc, [cur]: false };
}, {});

export default function Search() {
    const [timeList, setTimeList] = useState(DEFAULT_TIME_LIST);
    const [modalOpen, setModalOpen] = useState(false);
    const [mapType, setMapType] = useState("");
    const [searchParams] = useSearchParams();
    const [departure, destination] = [
        searchParams.get("departure") || "출발지",
        searchParams.get("destination") || "도착지"
    ];

    const handleOpenModal = ({ target: { name } }) => {
        setMapType(name);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleWeekClick = (day) => {
        setTimeList((prevTimeList) => ({
            ...prevTimeList,
            [day]: !prevTimeList[day]
        }));
    };

    const dayListElement = weekDays.map((day) => (
        <li
            key={day}
            className={styles.dayItem}
            onClick={() => handleWeekClick(day)}
        >
            {day[0]}
        </li>
    ));

    const timeListElement = weekDays
        .filter((day) => timeList[day] === true)
        .map((day, index) => <TimeItem day={day} key={`day-${index}`} />);

    const timeListElemen = timeListElement.length ? (
        timeListElement
    ) : (
        <li className={styles.timeEmpty}>픽업 요일을 선택해주세요</li>
    );

    return (
        <>
            <main className={styles.container}>
                <Header title="픽업 신청" />
                <section className={styles.contents}>
                    <form className={styles.locationForm}>
                        <label className={styles.locationLabel}>
                            출발지/도착지
                        </label>
                        <input
                            type="button"
                            className={styles.locationInput}
                            name="출발지"
                            value={departure}
                            onClick={handleOpenModal}
                        />
                        <input
                            type="button"
                            className={styles.locationInput}
                            name="도착지"
                            value={destination}
                            onClick={handleOpenModal}
                        />
                    </form>
                    <article className={styles.dayBox}>
                        <label className={styles.dayLabel}>픽업 요일</label>
                        <ul className={styles.dayList}>{dayListElement}</ul>
                    </article>
                    <article className={styles.time}>
                        <label className={styles.timeLabel}>픽업 시간</label>
                        <ul className={styles.timeList}>{timeListElemen}</ul>
                    </article>
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
