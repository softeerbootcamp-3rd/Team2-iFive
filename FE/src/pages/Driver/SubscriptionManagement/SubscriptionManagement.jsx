import React from "react";
import styles from "./SubscriptionManagement.module.scss";
import iDrop from "@/assets/iDropGreen.svg";
import { transformSchedule } from "../../Parents/History/HistoryItem/transformSchedule";
import { removeCityPrefix } from "../../../utils/parseData";
import { Header } from "@/components/Header/Header";
import { getKidInfo } from "@/service/childrenAPI";
import { useLoaderData } from "react-router-dom";
import { ScheduleList } from "../../../components/Schedule/ScheduleList";

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
    status,
    schedule
}) {
    startAddress = removeCityPrefix(startAddress);
    endAddress = removeCityPrefix(endAddress);
    schedule = transformSchedule(schedule);
    return (
        <div className={styles.content}>
            <div className={styles.kidInfo}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <div>
                        <span className={styles.name}>{childName}</span>
                        <span className={styles.birthDay}>
                            {childGender}, {childBirth}
                        </span>
                    </div>

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
            <ScheduleList schedule={schedule} status={status} />
            <div className={styles.btnBox}>
                {status !== "승인" && (
                    <>
                        <button className={styles.denyButton}>거절</button>
                        <button className={styles.acceptButton}>수락</button>
                    </>
                )}
            </div>
        </div>
    );
}

export async function fetchSubscribeList() {
    const fetchData = await getKidInfo("driver/subscribe/list");
    return fetchData;
}
