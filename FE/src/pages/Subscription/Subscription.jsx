import { useState } from "react";
import styles from "./Subscribe.module.scss";
import { Header } from "@/components/common/Header/Header";
import { Footer } from "@/components/common/Footer/Footer";
import { TimeItem } from "@/components/Subscribe/TimeItem";

const weekDays = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
];

export default function Subscription() {
    const [timeList, setTimeList] = useState(["일요일"]);

    const dayListElement = weekDays.map((day) => (
        <li key={day} className={styles.dayItem}>
            {day[0]}
        </li>
    ));

    const timeListElement = timeList.length ? (
        timeList.map((day, index) => (
            <TimeItem day={day} key={`day-${index}`} />
        ))
    ) : (
        <li className={styles.timeEmpty}>픽업 요일을 선택해주세요</li>
    );

    return (
        <main className={styles.container}>
            <Header title="픽업 신청" />
            <section className={styles.contents}>
                <form className={styles.locationForm}>
                    <label className={styles.locationLabel}>
                        출발지/도착지
                    </label>
                    <input
                        type="text"
                        className={styles.locationInput}
                        placeholder="출발지"
                    />
                    <input
                        type="text"
                        className={styles.locationInput}
                        placeholder="도착지"
                    />
                </form>
                <article className={styles.dayBox}>
                    <label className={styles.dayLabel}>픽업 요일</label>
                    <ul className={styles.dayList}>{dayListElement}</ul>
                </article>
                <article className={styles.time}>
                    <label className={styles.timeLabel}>픽업 시간</label>
                    <ul className={styles.timeList}>{timeListElement}</ul>
                </article>
            </section>
            <Footer text="확인" />
        </main>
    );
}
