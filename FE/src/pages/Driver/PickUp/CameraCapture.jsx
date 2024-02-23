import { useRef, useState } from "react";
import styles from "./CameraCapture.module.scss";
import Camera from "@/assets/camera.svg";

export function CameraSnapshotPreview() {
    const [previewSrc, setPreviewSrc] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreviewSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.cameraContainer}>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                capture="camera"
                className={styles.imageInput}
                onChange={handleFileChange}
            />
            <label htmlFor="imageUpload" className={styles.imgContainer}>
                <img src={Camera} />
                사진 등록
            </label>

            {previewSrc && (
                <img
                    src={previewSrc}
                    alt="Preview"
                    className={styles.previewImageBox}
                ></img>
            )}
        </div>
    );
}
