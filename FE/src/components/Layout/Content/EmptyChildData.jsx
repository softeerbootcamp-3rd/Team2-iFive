import styles from "./NoChildData.module.scss";

export function NoChildItems({ type }) {
    let msg;
    const MENU = "오늘 예정된 픽업은 없어요";
    const SELECT = "현재 가능한 픽업이 없어요";
    const SUBSCRIBE = "현재 요청된 구독이 없어요";

    switch (type) {
        case "menu":
            msg = MENU;
            break;
        case "select":
            msg = SELECT;
            break;
        case "subscribe":
            msg = SUBSCRIBE;
            break;
        default:
            break;
    }

    return <div className={styles.headMessage}>{msg}</div>;
}
