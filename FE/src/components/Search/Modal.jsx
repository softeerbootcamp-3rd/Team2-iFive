import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss";
import { Footer } from "../common/Footer/Footer";
import { AddressFinderMap } from "./AddressFinderMap";

export function Modal({
    mapFor,
    isOpen,
    onClose,
    location,
    handleLocationSelect,
    detailAddress,
    setDetailAddress
}) {
    const [animate, setAnimate] = useState(false);

    const handleDetailAddressChange = ({ target: { value } }) => {
        setDetailAddress((prev) => ({
            ...prev,
            [mapFor]: value
        }));
    };

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
                    value={location[mapFor].address}
                    placeholder="지도를 이동해 주세요"
                    readOnly
                />
                <label htmlFor="detailAddress">상세주소</label>
                <input
                    name="detailAddress"
                    className={styles.address}
                    type="text"
                    value={detailAddress[mapFor]}
                    onChange={handleDetailAddressChange}
                    placeholder="상세 주소가 있다면 적어주세요"
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
