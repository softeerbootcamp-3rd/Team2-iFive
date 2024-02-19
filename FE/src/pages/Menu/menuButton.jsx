import styles from "./menuButton.module.scss";
import { useNavigate } from "react-router-dom";

export function MenuButton({ imgUrl, text, route, data = {} }) {
    const navigate = useNavigate();
    const movePage = () => {
        navigate(`${route}`, { state: { kidData: data } });
    };
    return (
        <div className={styles.wrapper} onClick={movePage}>
            <img src={imgUrl}></img>
            <span>{text}</span>
        </div>
    );
}
