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

    const { state } = useLocation();
    const flag = state?.flag;
    const childrenData = state?.childrenData;

    const kidData = flag ? childrenData[0] : childrenData;

    const {
        location: { latitude, longitude },
        isLoading
    } = useCoords();

    const notesRef = useRef();

    const [image, setImage] = useState();

    const onSetImage = async (image) => {
        let checkLocation = false;
        setImage(image);
        if (!flag) {
            checkLocation = await isWithinRadius(
                kidData.startLatitude,
                kidData.startLongitude,
                latitude,
                longitude
            );
        } else {
            checkLocation = await isWithinRadius(
                kidData.endLatitude,
                kidData.endLongitude,
                latitude,
                longitude
            );
        }
        if (checkLocation) {
            setCrntLocation(!validLocation);
        } else {
            let msg = !flag
                ? "현재 위치는 출발지로부터 300m 밖의 범위 입니다. 출발지 근처에서 픽업해주세요"
                : "현재 위치는 목적지로부터 300m 밖의 범위 입니다. 목적지 근처에서 픽업해주세요";
            alert(msg);
        }
    };

    const navigate = useNavigate();
    const movePage = (route) => {
        navigate(`${route}`, { state: childrenData });
    };

    const handleClick = async () => {
        if (!image) {
            alert("이미지 업로드 해주세요!");
            return;
        }
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
                <ContentsBox {...kidData} />
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
            {!validLocation ? (
                <Footer
                    isButtonDisabled="true"
                    text={flag ? "픽업 종료" : "픽업 시작"}
                    onClick={handleClick}
                ></Footer>
            ) : (
                <Footer
                    text={flag ? "픽업 종료" : "픽업 시작"}
                    onClick={handleClick}
                ></Footer>
            )}
        </div>
    );
}
