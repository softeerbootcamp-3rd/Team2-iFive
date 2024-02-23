import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import styles from "./PickUp.module.scss";
import { CameraSnapshotPreview } from "./CameraSnapshotPreview";
import { postKidInfo } from "@/service/childrenAPI";
import { isWithinRadius } from "@/utils/calculatorDistance";
import { useCoords } from "@/hooks/useCoords";
import { ContentsBox } from "../../../components/Bottomsheet/ContentsBox/ContentsBox";

export default function PickUpPage() {
    const [validLocation, setCrntLocation] = useState(false);

    const { state: childrenData } = useLocation();
    const kidData = childrenData;

    const {
        location: { latitude, longitude },
        isLoading
    } = useCoords();

    const notesRef = useRef();

    const [image, setImage] = useState();

    const onSetImage = (image) => {
        setImage(image);
        let checkLocation;
        if (!flag) {
            checkLocation = isWithinRadius(
                kidData.startLatitude,
                kidData.startLongitude,
                latitude,
                longitude
            );
        } else {
            checkLocation = isWithinRadius(
                kidData.endLatitude,
                kidData.endLongitude,
                latitude,
                longitude
            );
        }
        setCrntLocation(checkLocation);
    };

    const { state } = useLocation();
    const flag = state?.flag;

    const navigate = useNavigate();
    const movePage = (route) => {
        navigate(`${route}`, { state: { childrenData: childrenData } });
    };

    const handleClick = async () => {
        if (!image) {
            alert("이미지 업로드 해주세요!");
            return;
        }
        console.log(image);
        const formData = new FormData();
        formData.append("childId", kidData.childId);
        formData.append("image", image);
        formData.append("message", notesRef.current.value);

        const result = await postKidInfo(formData);
        result &&
            (flag ? movePage("/endpickup") : movePage("/map?type=driver"));
    };

    return (
        <div className={styles.wrapper}>
            <Header title={flag ? "픽업 종료" : "픽업 시작"}></Header>
            <div className={styles.contents}>
                <ContentsBox {...childrenData} />
                <CameraSnapshotPreview onSetImage={onSetImage} />
                <div className={styles.textarea}>
                    <label htmlFor="significant">특이사항</label>
                    <textarea
                        ref={notesRef}
                        id="significant"
                        name="significant"
                        rows={5}
                        placeholder="오늘 픽업 시 특의사항이 있다면 작성해주세요"
                    ></textarea>
                </div>
            </div>
            {validLocation ? (
                <Footer
                    text={flag ? "픽업 종료" : "픽업 시작"}
                    onClick={handleClick}
                ></Footer>
            ) : (
                <Footer
                    isButtonDisabled="true"
                    text={flag ? "픽업 종료" : "픽업 시작"}
                    onClick={handleClick}
                ></Footer>
            )}
        </div>
    );
}
