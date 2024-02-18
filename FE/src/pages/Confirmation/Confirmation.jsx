import { CompleteComponent } from "../../Components/Common/Complete/Complete";
import contact from "@/assets/contact.svg";

export default function SubscriptionConfirmation() {
    const data = {
        header: "픽업 요청 완료",
        imgSrc: contact,
        date: "2024.02.01 ~ 2024.02.28",
        text: "기사님이 승인하시면 픽업이 시작됩니다."
    };
    return <CompleteComponent {...data} />;
}
