import { Header } from "@/components/Header/Header";
import { ContentsBox } from "@/components/Bottomsheet/ContentsBox/ContentsBox";
import styles from "./SelectChild.module.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function SelectChild() {
    const { state: childrenData } = useLocation();
    return (
        <>
            <Header title="픽업 선택" />
            <div className={styles.container}>
                <ContentsBox childrenData={childrenData} type="driver" />
            </div>
        </>
    );
}
