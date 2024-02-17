import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../../components/common/Footer/Footer";
import { KidInfoComponent } from "../../components/common/Bottomsheet/KidInfoBox";
import { Header } from "../../components/common/Header/Header";
import styles from "./PickUp.module.scss";

const exampleData = {
    childName: "김하나",
    childImage: "String...",
    startAddress: "에티버스러닝 학동캠퍼스",
    endAddress: "코마츠",
    startDate: "9:00",
    endDate: "10:00"
};

export function PickUpPage({ childData }) {
    // TO DO: 지금 픽업할 아이 정보 받아오기

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
                <KidInfoComponent {...exampleData} />
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
