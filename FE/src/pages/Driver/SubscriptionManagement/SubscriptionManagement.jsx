import React from "react";
import styles from "./SubscriptionManagement.module.scss";
import iDrop from "@/assets/iDropGreen.svg";
import { transformSchedule } from "../../Parents/History/HistoryItem/transformSchedule";
import { isHaveItems, removeCityPrefix } from "../../../utils/parseData";
import { Header } from "@/components/Header/Header";
import { getKidInfo } from "@/service/childrenAPI";
import { redirect, useLoaderData } from "react-router-dom";
import { ScheduleList } from "../../../components/Schedule/ScheduleList";
import { postSubscribeRequest } from "../../../service/driverAPI";
import { useFetch } from "../../../hooks/useFetch";
import { NoChildItems } from "../../../components/Layout/Content/EmptyChildData";
import { Loader } from "../../../components/Loader/Loader";

export default function SubscriptionManagement() {
    const {
        loading,
        data: subscribeList,
        error,
        refetchData
    } = useFetch("/driver/subscribe/list", {});

    if (loading || !subscribeList) return <Loader />;
    if (error) redirect("/menu");

    const isHaveData = isHaveItems(subscribeList);

    return (
        <div>
            <Header title="구독 요청 목록" />
            {isHaveData ? (
                subscribeList.map((subscription, index) => (
                    <KidInformationBox key={index} {...subscription} />
                ))
            ) : (
                <NoChildItems type="subscribe" />
            )}
        </div>
    );
}

function KidInformationBox({
    pickUpInfoId,
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
    schedule,
    refetchData
}) {
    startAddress = removeCityPrefix(startAddress);
    endAddress = removeCityPrefix(endAddress);
    schedule = transformSchedule(schedule);

    const handleSubscription = async (pickUpId, status) => {
        const postData = {
            pickUpInfoId: pickUpId,
            statusCode: status
        };
        await postSubscribeRequest(postData);
        // TODO 요청 처리 후 데이터 업데이트 고려하기
    };

    return (
        <div className={styles.content}>
            <div className={styles.kidInfo}>
                <img className={styles.kidImg} src={childImage || iDrop}></img>
                <div className={styles.infoBox}>
                    <div className={styles.profiles}>
                        <span className={styles.name}>{childName}</span>
                        <div
                            className={`${styles.status} ${status === "대기" ? styles.waiting : styles.accept}`}
                        >
                            {status}
                        </div>
                    </div>
                    <span className={styles.birthDay}>
                        {childGender}, {childBirth}
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
            <ScheduleList schedule={schedule} status={status} />
            <div className={styles.btnBox}>
                {status !== "승인" && (
                    <>
                        <button
                            className={styles.denyButton}
                            onClick={() =>
                                handleSubscription(
                                    pickUpInfoId,
                                    statusCode.refuse
                                )
                            }
                        >
                            거절
                        </button>
                        <button
                            className={styles.acceptButton}
                            onClick={() =>
                                handleSubscription(
                                    pickUpInfoId,
                                    statusCode.accept
                                )
                            }
                        >
                            수락
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

const statusCode = {
    accept: 1,
    refuse: 0
};

export async function fetchSubscribeList() {
    const fetchData = await getKidInfo("driver/subscribe/list");
    return fetchData;
}
