import { useRef, useState } from "react";
import styles from "./CameraSnapshotPreview.module.scss";
import Camera from "@/assets/camera.svg";

export function CameraSnapshotPreview({ onSetImage }) {
    const [previewSrc, setPreviewSrc] = useState("");
    const [cmpImage, setCmpImage] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onSetImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPreviewSrc(e.target.result);
                compressImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const compressImage = (imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;

            // 이미지를 canvas에 그림
            ctx.drawImage(img, 0, 0);

            // canvas를 이미지로 변환하고 압축
            canvas.toBlob(
                (blob) => {
                    onSetImage(blob);
                },
                "image/jpeg", // 이미지 형식 지정
                0.5 // 이미지 품질 (0.5는 압축률이 낮은 상태를 나타냄)
            );
        };
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
