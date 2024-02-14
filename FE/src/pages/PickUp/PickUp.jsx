import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../../Components/Common/Footer/Footer";
import { KidInfo } from "../../components/common/Bottomsheet/KidInfoBox";
import { Header } from "../../components/common/Header/Header";
import styles from "./PickUp.module.scss";

const mockChildData = {
    name: "육 아들",
    time: "7:00~8:00",
    start: "서울 시청",
    goal: "국민대"
};

export function PickUpPage({ childData }) {
    const { state } = useLocation();
    const flag = state?.flag;

    const navigate = useNavigate();
    const movePage = (route) => {
        navigate(`${route}`);
    };

    const handleClick = () => {
        flag ? movePage("/publish") : movePage("/map?type=driver");
    };
    return (
        <div className={styles.wrapper}>
            <Header title={flag ? "픽업 종료" : "픽업 시작"}></Header>
            <div className={styles.contents}>
                <KidInfo childData={mockChildData}></KidInfo>
                <div className={styles.imgContainer}>사진 등록</div>
                <div className={styles.textarea}>
                    <label htmlFor="significant">특이사항</label>
                    <textarea
                        id="significant"
                        name="significant"
                        rows={10}
                        placeholder="오늘 픽업 시 특의사항이 있다면 작성해주세요"
                    ></textarea>
                </div>
            </div>
            <Footer
                text={flag ? "픽업 종료" : "픽업 시작"}
                onClick={handleClick}
            ></Footer>
        </div>
    );
}
