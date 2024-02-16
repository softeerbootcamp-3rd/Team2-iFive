import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { Footer } from "../common/Footer/Footer";
import { AddressFinderMap } from "./AddressFinderMap";

export function Modal({
    mapFor,
    isOpen,
    onClose,
    location,
    handleLocationSelect
}) {
    const [animate, setAnimate] = useState(false);

    const handleClose = () => {
        setAnimate(false);
    };

    const handleAnimationEnd = () => {
        if (!animate) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            setAnimate(true);
        }
    }, [isOpen]);

    if (!isOpen && !animate) return null;

    return ReactDOM.createPortal(
        <div
            className={`${styles.modalFull} ${
                animate ? styles.slideIn : styles.slideOut
            }`}
            onAnimationEnd={handleAnimationEnd}
        >
            <AddressFinderMap handleLocationSelect={handleLocationSelect} />
            <div className={styles.addressWrapper}>
                <label htmlFor="address">
                    {mapFor === "departure" ? "출발지" : "도착지"}
                </label>
                <input
                    name="address"
                    className={styles.address}
                    type="text"
                    value={location[mapFor].address || "지도를 이동해 주세요"}
                    readOnly
                />
            </div>
            <Footer
                className={styles.closeButton}
                onClick={handleClose}
                text="완료"
            />
        </div>,
        document.getElementById("portal")
    );
}
