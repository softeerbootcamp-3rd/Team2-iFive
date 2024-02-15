import styles from "./AddressForm.module.scss";
import { useSearchParams } from "react-router-dom";

export function AddressForm({ handleOpenModal }) {
    const [searchParams] = useSearchParams();
    const [departure, destination] = [
        searchParams.get("departure") || "출발지",
        searchParams.get("destination") || "도착지"
    ];
    return (
        <form className={styles.addressForm}>
            <label className={styles.addressLabel}>출발지/도착지</label>
            <input
                type="button"
                className={styles.addressInput}
                name="출발지"
                value={departure}
                onClick={handleOpenModal}
            />
            <input
                type="button"
                className={styles.addressInput}
                name="도착지"
                value={destination}
                onClick={handleOpenModal}
            />
        </form>
    );
}
