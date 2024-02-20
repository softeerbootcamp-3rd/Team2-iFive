import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../../components/common/Footer/Footer";
import { DriverContents } from "../../components/common/Bottomsheet/KidInfoBox";
import { Header } from "../../components/common/Header/Header";
import styles from "./PickUp.module.scss";
import { CameraCapture } from "./cameraCapture";
import { postKidInfo } from "../../service/api";
import { isWithinRadius } from "../../utils/calculatorDistance";
import { useCoords } from "../../hooks/useCoords";

export default function PickUpPage() {
    const [validLocation, setCrntLocation] = useState(false);

    const childrenData = getChildrenData();
    const kidData = childrenData[0];

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
                <DriverContents childrenData={childrenData} />
                <CameraCapture onSetImage={onSetImage} />
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

function getChildrenData() {
    const location = useLocation();
    return location.state.childrenData;
}
