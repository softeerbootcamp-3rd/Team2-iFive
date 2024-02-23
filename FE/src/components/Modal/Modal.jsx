import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";

export function Modal({
    isVisible: { isOpen, animate },
    onClose,
    children,
    animationType = "scale",
    width = "100%",
    height = "100%"
}) {
    const modalStyle = {
        width,
        height
    };

    const handleAnimationEnd = () => {
        if (!animate) {
            onClose();
        }
    };

    if (!animate || !isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className={`${styles.modalContent} ${
                animate
                    ? styles[animationType + "In"]
                    : styles[animationType + "Out"]
            }`}
            style={modalStyle}
            onAnimationEnd={handleAnimationEnd}
        >
            {children}
        </div>,
        document.getElementById("portal")
    );
}
