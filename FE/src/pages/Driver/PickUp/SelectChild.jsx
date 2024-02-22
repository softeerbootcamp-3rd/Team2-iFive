import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header/Header";
import { ContentsBox } from "@/components/Bottomsheet/ContentsBox/ContentsBox";
import { getKidInfo } from "@/service/childrenAPI";
import styles from "./SelectChild.module.scss";

export default function SelectChild() {
    const { state: childrenData } = useLocation();
    //TODO: 페이지 접근 시 남아있는 픽업 리스트 요청. 없는 경우 접근을 제한
    // const childrenData = useLoaderData();
    return (
        <>
            <Header title="픽업 선택" />
            <div className={styles.container}>
                <ContentsBox childrenData={childrenData} type="driver" />
            </div>
        </>
    );
}

export async function fetchPickUpList() {
    const pickUpList = await getKidInfo();
    return pickUpList.data;
}
