import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss"; // CSS 모듈 import
import { Footer } from "../common/Footer/Footer";
import { AddressFinderMap } from "./AddressFinderMap/AddressFinderMap";
import { useSearchParams } from "react-router-dom";

export function Modal({ type, isOpen, onClose }) {
    const [animate, setAnimate] = useState(false);
    const [newAddress, setNewAddress] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const handleClose = () => {
        const searchParamKey = type === "출발지" ? "departure" : "destination";
        setSearchParams({
            ...Object.fromEntries(searchParams),
            [searchParamKey]: newAddress
        });
        setNewAddress("");
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
            <AddressFinderMap setNewAddress={setNewAddress} />
            <div className={styles.addressWrapper}>
                <label htmlFor="address">{type}</label>
                <input
                    name="address"
                    className={styles.address}
                    type="text"
                    value={newAddress || "지도를 이동해 주세요"}
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
