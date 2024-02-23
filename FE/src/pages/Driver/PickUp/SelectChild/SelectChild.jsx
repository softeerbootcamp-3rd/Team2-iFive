import { redirect, useLoaderData, useLocation } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { getKidInfo } from "@/service/childrenAPI";
import styles from "./SelectChild.module.scss";
import { TodayPickUpList } from "./TodayPickUpList";

export default function SelectChild() {
    const { state: childrenData } = useLocation();
    // const childrenData = useLoaderData();

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
    try {
        const pickUpList = await getKidInfo();
        return pickUpList.data;
    } catch (error) {
        alert("현재 가능한 픽업이 없습니다.");
        redirect("/menu");
    }
}
