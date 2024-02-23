import { useRef, useState } from "react";
import styles from "./CameraCapture.module.scss";
import Camera from "@/assets/camera.svg";

export function CameraCapture({ onSetImage }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const [isToggle, setIsToggle] = useState(true);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true
            });
            setIsToggle(!isToggle);
            canvasRef.current.style.display = "none";
            videoRef.current.style.display = "block ";
            videoRef.current.srcObject = stream;
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const capture = () => {
        // 비디오 스트림의 가로세로 크기를 얻어 1:1 비율로 조정
        const size = Math.min(
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
        );
        canvasRef.current.width = size;
        canvasRef.current.height = size;

        const context = canvasRef.current.getContext("2d");
        context.drawImage(
            videoRef.current,
            (videoRef.current.videoWidth - size) / 2,
            (videoRef.current.videoHeight - size) / 2,
            size,
            size,
            0,
            0,
            size,
            size
        );
        canvasRef.current.toBlob((blob) => {
            onSetImage(blob);
        }, "image.jpeg");
        setIsToggle(!isToggle);
        videoRef.current.srcObject = null;
        videoRef.current.style.display = "none";
        canvasRef.current.style.display = "block";
    };

    return (
        <div className={styles.cameraContainer}>
            {isToggle && (
                <div className={styles.imgContainer} onClick={startCamera}>
                    <img src={Camera} />
                    사진 등록
                </div>
            )}
            <video className={styles.video} ref={videoRef} autoPlay></video>
            {!isToggle && <button onClick={capture}>캡처</button>}
            <canvas className={styles.video} ref={canvasRef}></canvas>
        </div>
    );
}
