import styles from "./bottomsheet.module.scss";
import { KidInfo } from "./KidInfoBox";
export function BottomSheet({ data }) {
    return (
        <div className={styles.wrapper}>
            <KidInfo data={data}></KidInfo>
        </div>
    );
}
