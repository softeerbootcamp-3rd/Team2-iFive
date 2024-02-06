import { useState } from "react";
import styles from "./Subscribe.module.scss";
import backIcon from "@/assets/back.svg";

export default function Subscribe() {
    const [timeList, setTimeList] = useState(["일요일"]);
    const timeListElement = timeList.length ? (
        timeList.map((day) => (
            <li className={styles.timeItem}>
                <h6 className={styles.timeDay}>{day}</h6>
                <form className={styles.timeForm}>
                    <div className={styles.timeWrapper}>
                        <input type="text" className={styles.timeInput} />
                        <label className={styles.timeSuffix}>시</label>
                        <input type="text" className={styles.timeInput} />
                        <label className={styles.timeSuffix}>분</label>
                    </div>
                </form>
            </li>
        ))
    ) : (
        <li className={styles.timeEmpty}>픽업 요일을 선택해주세요</li>
    );
    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <img src={backIcon} />
                <h2 className={styles.title}>픽업 신청</h2>
            </header>
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
                <form className={styles.dayForm}>
                    <label className={styles.dayLabel}>픽업 요일</label>
                    <ul className={styles.dayList}>
                        <li className={styles.dayItem}>일</li>
                        <li className={styles.dayItem}>월</li>
                        <li className={styles.dayItem}>화</li>
                        <li className={styles.dayItem}>수</li>
                        <li className={styles.dayItem}>목</li>
                        <li className={styles.dayItem}>금</li>
                        <li className={styles.dayItem}>토</li>
                    </ul>
                </form>
                <form className={styles.time}>
                    <label className={styles.timeLabel}>픽업 시간</label>
                    <ul className={styles.timeList}>{timeListElement}</ul>
                </form>
            </section>
            <footer className={styles.footer}>
                <button className={styles.footerBtn} type="button">
                    확인
                </button>
            </footer>
        </main>
    );
}
