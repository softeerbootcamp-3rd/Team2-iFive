import { CompleteComponent } from "../../Components/Common/Complete/Complete";
import contact from "@/assets/contact.svg";

export default function Publish() {
    const data = {
        header: "픽업 요청 완료",
        imgSrc: contact,
        date: "2024.02.01 ~ 2024.02.28",
        text: "dafasfsdfs"
    };
    return <CompleteComponent {...data}></CompleteComponent>;
}
