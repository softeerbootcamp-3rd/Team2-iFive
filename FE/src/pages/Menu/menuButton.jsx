import styles from "./menuButton.module.scss";
import { useNavigate } from "react-router-dom";

export function MenuButton({ imgUrl, text, route }) {
    const navigate = useNavigate();
    const movePage = () => {
        navigate(`${route}`);
    };
    return (
        <div className={styles.wrapper} onClick={movePage}>
            <img src={imgUrl}></img>
            <span>{text}</span>
        </div>
    );
}
