import { useNavigate } from "react-router-dom";
import { CompleteComponent } from "@/components/Complete/Complete";
import truck from "@/assets/truck.png";

export default function EndPickUp() {
    const navigate = useNavigate();
    const movePage = () => {
        navigate("/");
    };
    const data = {
        header: "운행 종료",
        imgSrc: truck,
        date: "",
        text: "오늘도 안전한 픽업 감사드려요",
        onClick: movePage
    };
    return <CompleteComponent {...data} />;
}
