import React from "react";
import styles from "./SubscriptionManagement.module.scss";
import iDrop from "@/assets/iDropGreen.svg";
import { Header } from "@/components/Header/Header";
import { getKidInfo } from "@/service/childrenAPI";
import { useLoaderData } from "react-router-dom";

export default function SubscriptionManagement() {
    const subscribeList = useLoaderData();

    return (
        <div>
            <Header title="구독 요청 목록" />
            {subscribeList.map((subscription, index) => (
                <KidInformationBox key={index} {...subscription} />
            ))}
        </div>
    );
}

function KidInformationBox({
    childImage,
    childName,
    childBirth,
    childGender,
    startDate,
    endDate,
    startAddress,
    endAddress,
    parentName,
    parentPhoneNumber,
    schedule
}) {
    startAddress = removeCityPrefix(startAddress);
    endAddress = removeCityPrefix(endAddress);
    return (
        <div className={styles.content}>
            <div className={styles.kidInfo}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <span>
                        {childName}{" "}
                        <span className={styles.birthDay}>
                            {childGender}, {childBirth}
                        </span>
                    </span>
                    <span>
                        {startDate} ~ {endDate}
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

function removeCityPrefix(address) {
    return address !== null ? address.replace("서울특별시 ", "") : "null";
}

export async function fetchSubscribeList() {
    const fetchData = await getKidInfo("driver/subscribe/list");
    return fetchData;
}
