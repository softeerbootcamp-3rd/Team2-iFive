import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import backIcon from "@/assets/back.svg";

/**
 *
 * @param {string} title
 * @returns
 */
export function Header({ title, back = -1, onClick }) {
    const navigate = useNavigate();
    const handleClick = () => {
        onClick ? onClick() : navigate(back);
    };
    return (
        <header className={styles.header}>
            <button onClick={handleClick}>
                <img src={backIcon} />
            </button>
            <h2 className={styles.title}>{title}</h2>
        </header>
    );
}
