import { Modal } from "@/components/Modal/Modal";
import { AddressFinderMap } from "./AddressFinderMap/AddressFinderMap";
import { Footer } from "@/components/Footer/Footer";
import styles from "./MapModal.module.scss";
import { MapAddressForm } from "./MapAddressForm/MapAddressForm";

export function MapModal({
    isVisible,
    onClose,
    handleLocationSelect,
    mapType,
    location
}) {
    return (
        <Modal
            isVisible={isVisible}
            onClose={onClose}
            width="100%"
            height="100dvh"
            animationType="slideDown"
        >
            <div className={styles.modalContainer}>
                <AddressFinderMap
                    handleLocationSelect={handleLocationSelect}
                    mapType={mapType}
                />
                <MapAddressForm
                    mapType={mapType}
                    location={location}
                    handleLocationSelect={handleLocationSelect}
                />
                <Footer onClick={onClose} text="완료" />
            </div>
        </Modal>
    );
}
