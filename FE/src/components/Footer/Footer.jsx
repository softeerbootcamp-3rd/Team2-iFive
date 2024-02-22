import styles from "./Footer.module.scss";

/**
 *
 * @param {string} text
 * @returns
 */
export function Footer({ text, onClick, isButtonDisabled = false }) {
    return (
        <footer className={styles.footer}>
            <button
                className={`${styles.footerBtn} ${
                    isButtonDisabled && styles.disabled
                }`}
                onClick={onClick}
                type="button"
            >
                {text}
            </button>
        </footer>
    );
}
