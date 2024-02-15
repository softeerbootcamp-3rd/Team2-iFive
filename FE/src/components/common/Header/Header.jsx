import { Link } from "react-router-dom";
import styles from "./Header.module.scss";
import backIcon from "@/assets/back.svg";

/**
 *
 * @param {string} title
 * @returns
 */
export function Header({ title, back = -1 }) {
    return (
        <header className={styles.header}>
            <Link to={back}>
                <img src={backIcon} />
            </Link>
            <h2 className={styles.title}>{title}</h2>
        </header>
    );
}
