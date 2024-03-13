import styles from "./MapAddressForm.module.scss";

export function MapAddressForm({
    mapType,
    location,
    detailAddress,
    handleDetailAddressChange
}) {
    return (
        <div className={styles.addressWrapper}>
            <label htmlFor="address">
                {mapType === "departure" ? "출발지" : "도착지"}
            </label>
            <input
                name="address"
                className={styles.address}
                type="text"
                value={location[mapType].address}
                placeholder="지도를 이동해 주세요"
                readOnly
            />
            <label htmlFor="detailAddress">상세주소</label>
            <input
                name="detailAddress"
                className={styles.address}
                type="text"
                value={detailAddress[mapType]}
                onChange={handleDetailAddressChange}
                placeholder="상세 주소가 있다면 적어주세요"
            />
        </div>
    );
}
