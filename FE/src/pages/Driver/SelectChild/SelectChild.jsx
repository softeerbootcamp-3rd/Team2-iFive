import { redirect, useLoaderData, useLocation } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { getKidInfo } from "@/service/childrenAPI";
import styles from "./SelectChild.module.scss";
import { TodayPickUpList } from "./TodayPickUpList";
import { parseData } from "../../../utils/parseData";

export default function SelectChild() {
    const childrenData = useLoaderData();

    return (
        <>
            <Header title="픽업 선택" />
            <div className={styles.container}>
                {childrenData.length > 0 && (
                    <TodayPickUpList childrenData={childrenData} />
                )}
            </div>
        </>
    );
}

//페이지 접근 시 남아있는 픽업 리스트 요청. 없는 경우 메뉴로 리다이렉트
export async function fetchPickUpList() {
    const pickUpList = await getKidInfo("driver/pickup/today/remaining");
    return parseData(pickUpList.data);
}
