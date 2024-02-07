import styles from "./Header.module.scss";
import backIcon from "@/assets/back.svg";

/**
 *
 * @param {string} title
 * @returns
 */
export function Header({ title }) {
    return (
        <header className={styles.header}>
            <img src={backIcon} />
            <h2 className={styles.title}>{title}</h2>
        </header>
    );
}
