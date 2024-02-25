import { CompleteComponent } from "@/components/Complete/Complete";
import contact from "@/assets/contact.svg";
import { useNavigate } from "react-router-dom";

export default function SubscriptionConfirmation() {
    const navigate = useNavigate();

    const data = {
        header: "픽업 요청 완료",
        imgSrc: contact,
        text: "기사님이 승인하시면 픽업이 시작됩니다."
    };
    return <CompleteComponent {...data} onClick={() => navigate("/")} />;
}
