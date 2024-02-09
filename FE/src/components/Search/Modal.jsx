import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.scss"; // CSS 모듈 import

const Modal = ({ isOpen, onClose }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAnimate(true); // 모달 열기 애니메이션 시작
        }
    }, [isOpen]);

    const handleClose = () => {
        setAnimate(false); // 모달 닫기 애니메이션 시작
    };

    const handleAnimationEnd = () => {
        if (!animate) {
            onClose(); // 애니메이션 종료 후 모달 닫기
        }
    };

    if (!isOpen && !animate) return null;

    return ReactDOM.createPortal(
        <div
            className={`${styles.modalFull} ${
                animate ? styles.slideIn : styles.slideOut
            }`}
            onAnimationEnd={handleAnimationEnd}
        >
            <button className={styles.closeButton} onClick={handleClose}>
                완료
            </button>
            {/* 모달 내용 */}
        </div>,
        document.getElementById("portal")
    );
};

export default Modal;
