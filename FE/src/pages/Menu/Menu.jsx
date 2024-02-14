import styles from "./Menu.module.scss";
import { MenuButton } from "./menuButton";
import iDropGreen from "@/assets/iDropGreen.svg";
import { BottomSheet } from "../../components/common/Bottomsheet/Bottomsheet";
import { MENU_PAGE } from "../../constants/constants";

const userType = {
    parent: 0,
    driver: 1
};
const childData = {
    name: "육 아들",
    time: "7:00~8:00",
    start: "서울 시청",
    goal: "국민대"
};

// 현재 test를 위해 props의 default 값 부여. 추후 삭제 필요
export function Menu({ userRole = 1, userName = "육종호" }) {
    const { HELLO_MSG, INTRO_TEXT, MENU_LIST } = MENU_PAGE(userName, userRole);

    //비동기 통신으로 userRole, userinfo 받아오기

    const renderMenuItems = () =>
        MENU_LIST.map(({ icon, text, route }, index) => (
            <MenuButton key={index} imgUrl={icon} text={text} route={route} />
        ));

    return (
        <div className={styles.wrapper}>
            <img src={iDropGreen}></img>
            <div>
                <h1>{HELLO_MSG} </h1>
                <span>{INTRO_TEXT}</span>
            </div>
            <div className={styles.menuContainer}>{renderMenuItems()}</div>
            <BottomSheet childData={childData}></BottomSheet>
        </div>
    );
}
