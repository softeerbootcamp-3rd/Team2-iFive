import styles from "./Footer.module.scss";

/**
 *
 * @param {string} text
 * @returns
 */
export function Footer({ text, onClick }) {
    return (
        <footer className={styles.footer}>
            <button
                className={styles.footerBtn}
                onClick={onClick}
                type="button"
            >
                {text}
            </button>
        </footer>
    );
}
