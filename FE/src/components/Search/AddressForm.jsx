import styles from "./AddressForm.module.scss";

export function AddressForm({ handleOpenModal, location, detailAddress }) {
    const { departure, destination } = location;

    return (
        <form className={styles.addressForm}>
            <label className={styles.addressLabel}>출발지/도착지</label>
            <input
                required
                type="button"
                className={styles.addressInput}
                name="departure"
                value={
                    departure.address
                        ? departure.address + " " + detailAddress.departure
                        : "출발지"
                }
                onClick={handleOpenModal}
            />
            <input
                required
                type="button"
                className={styles.addressInput}
                name="destination"
                value={
                    destination.address
                        ? destination.address + " " + detailAddress.destination
                        : "도착지"
                }
                onClick={handleOpenModal}
            />
        </form>
    );
}
