import Location from "@/assets/Location.svg";
import Star from "@/assets/Star.svg";
import Success from "@/assets/Success.svg";
import User from "@/assets/user_icon.svg";
import Calender from "@/assets/calender.svg";
import Truck from "@/assets/truck.png";

export const userType = {
    parent: 0,
    driver: 1
};

export const MENU_PAGE = (userName) => ({
    HELLO_MSG: `안녕하세요, ${userName}님`,
    INTRO_MSG_PARENT: `오늘도 안전하게 픽업할게요`,
    INTRO_MSG_DRIVER: `오늘도 안전한 픽업 부탁드려요`,
    PARENT_MENU: [
        { icon: Location, text: "실시간 위치", route: "/map" },
        { icon: Success, text: "구독 하기" },
        { icon: User, text: "우리 아이" },
        { icon: Star, text: "이용 내역" }
    ],
    DRIVER_MENU: [
        { icon: Calender, text: "픽업 일정" },
        { icon: Truck, text: "픽업 시작", route: "/pickup" },
        { icon: User, text: "프로필" },
        { icon: Success, text: "요청 목록" }
    ]
});