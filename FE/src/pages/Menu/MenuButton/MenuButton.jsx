import { getCurrentPickUp } from "../../../service/parentsAPI";
import styles from "./menuButton.module.scss";
import { useNavigate } from "react-router-dom";

export function MenuButton({ imgUrl, text, route, data = null }) {
    const navigate = useNavigate();
    const movePage = async () => {
        navigate(`${route}`, { state: data });
    };
    return (
        <div className={styles.wrapper} onClick={movePage}>
            <img src={imgUrl}></img>
            <span>{text}</span>
        </div>
    );
}
