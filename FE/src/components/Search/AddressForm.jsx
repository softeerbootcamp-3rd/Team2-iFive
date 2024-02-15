import styles from "./AddressForm.module.scss";

export function AddressForm({ handleOpenModal, location }) {
    const { departure, destination } = location;

    return (
        <form className={styles.addressForm}>
            <label className={styles.addressLabel}>출발지/도착지</label>
            <input
                required
                type="button"
                className={styles.addressInput}
                name="departure"
                value={departure.address || "출발지"}
                onClick={handleOpenModal}
            />
            <input
                required
                type="button"
                className={styles.addressInput}
                name="destination"
                value={destination.address || "도착지"}
                onClick={handleOpenModal}
            />
        </form>
    );
}
