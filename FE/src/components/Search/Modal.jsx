import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss"; // CSS 모듈 import
import { Footer } from "../Common/Footer/Footer";
import { AddressFinderMap } from "./AddressFinderMap/AddressFinderMap";
import { useSearchParams } from "react-router-dom";

const Modal = ({ type, isOpen, onClose }) => {
    const [animate, setAnimate] = useState(false);
    const [newAddress, setNewAddress] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const handleClose = () => {
        const searchParamKey = type === "출발지" ? "departure" : "destination";
        setSearchParams({
            ...Object.fromEntries(searchParams),
            [searchParamKey]: newAddress
        });
        setAnimate(false); // 모달 닫기 애니메이션 시작
    };

    const handleAnimationEnd = () => {
        if (!animate) {
            onClose(); // 애니메이션 종료 후 모달 닫기
        }
    };

    useEffect(() => {
        if (isOpen) {
            setAnimate(true); // 모달 열기 애니메이션 시작
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
};

export default Modal;
