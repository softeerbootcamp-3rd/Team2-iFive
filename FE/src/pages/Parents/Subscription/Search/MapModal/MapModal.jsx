import { Modal } from "@/components/Modal/Modal";
import { AddressFinderMap } from "./AddressFinderMap/AddressFinderMap";
import { Footer } from "@/components/Footer/Footer";
import styles from "./MapModal.module.scss";
import { MapAddressForm } from "./MapAddressForm/MapAddressForm";

export function MapModal({
    isVisible,
    closeModal,
    handleDetailAddressChange,
    handleLocationSelect,
    mapType,
    location,
    detailAddress
}) {
    return (
        <Modal
            isVisible={isVisible}
            onClose={closeModal}
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
                    detailAddress={detailAddress}
                    handleDetailAddressChange={handleDetailAddressChange}
                />
                <Footer onClick={closeModal} text="완료" />
            </div>
        </Modal>
    );
}
