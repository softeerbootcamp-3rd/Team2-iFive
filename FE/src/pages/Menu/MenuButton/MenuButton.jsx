import { getCurrentPickUp } from "../../../service/parentsAPI";
import styles from "./menuButton.module.scss";
import { useNavigate } from "react-router-dom";

export function MenuButton({ imgUrl, text, route, data = null }) {
    const navigate = useNavigate();
    const movePage = async () => {
        if (text === "실시간 픽업") {
            const result = await getCurrentPickUp();
            if (!result) return;
        }
        navigate(`${route}`, { state: data });
    };
    return (
        <div className={styles.wrapper} onClick={movePage}>
            <img src={imgUrl}></img>
            <span>{text}</span>
        </div>
    );
}
