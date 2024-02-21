import React from "react";
import styles from "./Management.module.scss";
import iDrop from "@/assets/iDropGreen.svg";
import { Header } from "../../components/common/Header/Header";

export default function ManagementSubscription() {
    return (
        <div>
            <Header title="구독 요청 목록" />
            {exampleData.map((element, index) => (
                <KidInformationBox key={index} {...element} />
            ))}
        </div>
    );
}

function KidInformationBox({
    childImage,
    childName,
    childBirth,
    startDate,
    endDate,
    startAddress,
    endAddress,
    parentName,
    parentPhoneNumber,
    schedule
}) {
    return (
        <div className={styles.content}>
            <div className={styles.kidInfo}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <span>
                        {childName}{" "}
                        <span className={styles.birthDay}>{childBirth}</span>
                    </span>
                    <span>
                        {startDate} {"→"} {endDate}
                    </span>
                    <span>
                        {parentName} / {parentPhoneNumber}
                    </span>
                </div>
            </div>
            <div>
                <span>
                    {startAddress} <br /> {"→"} {endAddress}
                </span>
            </div>
            <div>수 8:30</div>
            <div className={styles.btnBox}>
                <button className={styles.denyButton}>거절</button>
                <button className={styles.acceptButton}>수락</button>
            </div>
        </div>
    );
}

const exampleData = [
    {
        pickUpInfoId: 1,
        parentName: "부모1",
        parentPhoneNumber: "010-1234-5678",
        childName: "김하나",
        childBirth: "2008-09-12",
        childGender: "여성",
        childImage: "https://profile.jpg",
        startDate: "2024-02-21",
        endDate: "2024-03-19",
        startAddress: "강남구 논현동 58-3 에티버스러닝 학동캠퍼스",
        endAddress: "강남구 학동로31길 15 코마츠",
        status: "승인",
        schedule: {
            Wed: {
                min: 30,
                hour: 8
            },
            Mon: {
                min: 30,
                hour: 8
            }
        }
    }
];
