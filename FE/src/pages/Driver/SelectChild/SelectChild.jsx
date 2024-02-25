import { redirect, useLoaderData, useLocation } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { getKidInfo } from "@/service/childrenAPI";
import styles from "./SelectChild.module.scss";
import { TodayPickUpList } from "./TodayPickUpList";
import { isHaveItems, parseData } from "../../../utils/parseData";
import { NoChildItems } from "@/components/Layout/Content/EmptyChildData";

export default function SelectChild() {
    const childrenData = useLoaderData();
    const isHaveChildData = isHaveItems(childrenData);

    return (
        <>
            <Header title="픽업 선택" />
            <div className={styles.container}>
                {isHaveChildData ? (
                    <TodayPickUpList childrenData={childrenData} />
                ) : (
                    <NoChildItems type="select" />
                )}
            </div>
        </>
    );
}

export async function fetchPickUpList() {
    const pickUpList = await getKidInfo("driver/pickup/today/remaining");
    return pickUpList.data.length === 0
        ? pickUpList.data
        : parseData(pickUpList.data);
}
