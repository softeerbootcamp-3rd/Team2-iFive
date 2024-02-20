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
    setLocation,
    handleLocationSelect,
    detailAddress,
    setDetailAddress
}) {
    const [animate, setAnimate] = useState(false);

    const handleAddressChange = async ({ target: { value } }) => {
        setLocation((prevLocation) => ({
            ...prevLocation,
            [mapFor]: { ...prevLocation[mapFor], address: value }
        }));
        const { address, point } = await searchAddressToCoordinate(value);
    };

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
                    onChange={handleAddressChange}
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

function searchAddressToCoordinate(address) {
    return new Promise((resolve, reject) => {
        naver.maps.Service.geocode(
            {
                query: address ? address : "DEFAULT"
            },
            function (status, response) {
                if (status === naver.maps.Service.Status.ERROR) {
                    return reject("위치 불러오기 실패");
                }

                if (response.v2.meta.totalCount === 0) {
                    return resolve({ address: null, point: null });
                }

                const item = response.v2.addresses[0];
                const point = new naver.maps.Point(
                    Number(item.x),
                    Number(item.y)
                );
                resolve({ address: item, point });
            }
        );
    });
}
