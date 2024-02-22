import React from "react";
import styles from "./Footer.module.scss";

/**
 * @param {Object} props
 * @param {string} props.text
 * @param {()=> void} props.onClick
 * @param {boolean} props.isButtonDisabled
 * @returns {React.ReactNode}
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
