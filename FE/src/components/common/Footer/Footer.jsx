import styles from "./Footer.module.scss";

/**
 *
 * @param {string} text
 * @returns
 */
export function Footer({ text }) {
    return (
        <footer className={styles.footer}>
            <button className={styles.footerBtn} type="button">
                {text}
            </button>
        </footer>
    );
}
