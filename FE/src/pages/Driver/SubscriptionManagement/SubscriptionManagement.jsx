import React from "react";
import { isHaveItems } from "../../../utils/parseData";
import { Header } from "@/components/Header/Header";
import { getKidInfo } from "@/service/childrenAPI";
import { redirect } from "react-router-dom";
import { KidInformationBox } from "./KidInformationBox";
import { useFetch } from "../../../hooks/useFetch";
import { NoChildItems } from "../../../components/Layout/Content/EmptyChildData";
import { Loader } from "../../../components/Loader/Loader";

export default function SubscriptionManagement() {
    const {
        loading,
        data: subscribeList,
        error,
        fetchData
    } = useFetch("/driver/subscribe/list", {});

    if (loading || !subscribeList) return <Loader />;
    if (error) redirect("/menu");

    const isHaveData = isHaveItems(subscribeList);

    return (
        <div>
            <Header title="구독 요청 목록" />
            {isHaveData ? (
                subscribeList.map((subscription, index) => (
                    <KidInformationBox
                        key={index}
                        subscripData={subscription}
                        fetchData={fetchData}
                    />
                ))
            ) : (
                <NoChildItems type="subscribe" />
            )}
        </div>
    );
}



export async function fetchSubscribeList() {
    const fetchData = await getKidInfo("driver/subscribe/list");
    return fetchData;
}
