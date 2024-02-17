import styles from "./Menu.module.scss";
import { MenuButton } from "./menuButton";
import iDropGreen from "@/assets/iDropGreen.svg";
import { BottomSheet } from "../../components/common/Bottomsheet/Bottomsheet";
import { MENU_PAGE } from "../../constants/constants";
import Location from "@/assets/Location.svg";
import Star from "@/assets/Star.svg";
import Success from "@/assets/Success.svg";
import User from "@/assets/user_icon.svg";
import Calender from "@/assets/calender.svg";
import Truck from "@/assets/truck.png";

export function DriverMenu() {
    const { HELLO_MSG, INTRO_TEXT, MENU_LIST } = DRIVER_MENU_PAGE("육종호");
    const renderMenuItems = () =>
        MENU_LIST.map(({ icon, text, route }, index) => (
            <MenuButton key={index} imgUrl={icon} text={text} route={route} />
        ));

    return (
        // TODO: 컴포넌트 쪼개기
        <div className={styles.wrapper}>
            <img src={iDropGreen}></img>
            <div>
                <h1>{HELLO_MSG} </h1>
                <span>{INTRO_TEXT}</span>
            </div>
            <div className={styles.menuContainer}>{renderMenuItems()}</div>
            <BottomSheet childData={exampleData}></BottomSheet>
        </div>
    );
}

export function ParentMenu() {
    const { HELLO_MSG, INTRO_TEXT, MENU_LIST } = PARENT_MENU_PAGE("육종호");
    const renderMenuItems = () =>
        MENU_LIST.map(({ icon, text, route }, index) => (
            <MenuButton key={index} imgUrl={icon} text={text} route={route} />
        ));

    return (
        // TODO: 컴포넌트 쪼개기
        <div className={styles.wrapper}>
            <img src={iDropGreen}></img>
            <div>
                <h1>{HELLO_MSG} </h1>
                <span>{INTRO_TEXT}</span>
            </div>
            <div className={styles.menuContainer}>{renderMenuItems()}</div>
            <BottomSheet childData={exampleData}></BottomSheet>
        </div>
    );
}

const exampleData = [
    {
        childName: "김하나",
        childImage: "String...",
        startAddress: "에티버스러닝 학동캠퍼스",
        endAddress: "코마츠",
        startDate: "2024.02.01",
        endDate: "2024.02.29"
    }
];

const DRIVER_MENU_PAGE = (userName) => ({
    HELLO_MSG: `안녕하세요, ${userName}님`,
    INTRO_TEXT: `오늘도 안전한 픽업 부탁드려요`,
    MENU_LIST: [
        { icon: Calender, text: "픽업 일정" },
        { icon: Truck, text: "픽업 시작", route: "/pickup" },
        { icon: User, text: "프로필" },
        { icon: Success, text: "요청 목록" }
    ]
});

const PARENT_MENU_PAGE = (userName) => ({
    HELLO_MSG: `안녕하세요, ${userName}님`,
    INTRO_TEXT: `오늘도 안전하게 픽업할게요`,
    MENU_LIST: [
        {
            icon: Location,
            text: "실시간 위치",
            route: "/map?type=parent"
        },
        { icon: Success, text: "구독 하기" },
        { icon: User, text: "우리 아이" },
        { icon: Star, text: "이용 내역" }
    ]
});
