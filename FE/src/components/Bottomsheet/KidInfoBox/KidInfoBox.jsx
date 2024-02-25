import styles from "./kidInfoBox.module.scss";
import { ContentsBox } from "../ContentsBox/ContentsBox";

export function DriverContents({ childrenData }) {
    return (
        <>
            {childrenData.map((child, index) => (
                <ContentsBox key={index} {...child} type="driver" />
            ))}
        </>
    );
}

export function ParentContents({ childrenData }) {
    return (
        <>
            {childrenData.map((child, index) => (
                <ContentsBox key={index} {...child} type="parent" />
            ))}
        </>
    );
}
