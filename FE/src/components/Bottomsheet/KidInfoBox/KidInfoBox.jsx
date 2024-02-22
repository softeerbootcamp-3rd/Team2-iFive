import styles from "./kidInfoBox.module.scss";
import { ContentsBox } from "../ContentsBox/ContentsBox";

export function DriverContents({ childrenData }) {
    const isHaveData = childrenData.length > 0 ? true : false;
    const headerMsg = isHaveData
        ? "오늘의 픽업"
        : "현재 매칭된 픽업이 없습니다";
    return (
        <>
            <span className={styles.headMessage}>{headerMsg}</span>
            {isHaveData &&
                childrenData.map((child, index) => (
                    <ContentsBox key={index} {...child} type="driver" />
                ))}
        </>
    );
}

export function ParentContents({ childrenData }) {
    const isHaveData = childrenData.length > 0 ? true : false;
    const headerMsg = isHaveData
        ? "픽업 서비스 구독 중"
        : "현재 매칭된 픽업이 없습니다";
    return (
        <>
            <span className={styles.headMessage}>{headerMsg}</span>
            {isHaveData &&
                childrenData.map((child, index) => (
                    <ContentsBox key={index} {...child} type="parent" />
                ))}
        </>
    );
}
