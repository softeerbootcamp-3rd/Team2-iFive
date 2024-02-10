import styles from "./Menu.module.scss";
import { MenuButton } from "./menuButton";
import Location from "@/assets/Location.svg";
import iDropGreen from "@/assets/iDropGreen.svg";
import Star from "@/assets/Star.svg";
import Success from "@/assets/Success.svg";
import user from "@/assets/user_icon.svg";
import { BottomSheet } from "../../components/common/Bottomsheet/Bottomsheet";

export function Menu() {
    const childData = {
        name: "육 아들",
        time: "7:00~8:00",
        start: "서울 시청",
        goal: "국민대"
    };
    return (
        <div className={styles.wrapper}>
            <img src={iDropGreen}></img>
            <div>
                <h1>안녕하세요, 육종호님!</h1>
                <span>오늘도 안전하게 픽업할게요</span>
            </div>
            <div className={styles.menuContainer}>
                <MenuButton imgUrl={Location} text="실시간 위치"></MenuButton>
                <MenuButton imgUrl={Success} text="구독하기"></MenuButton>
                <MenuButton imgUrl={user} text="프로필"></MenuButton>
                <MenuButton imgUrl={Star} text="이용내역"></MenuButton>
            </div>
            <BottomSheet childData={childData}></BottomSheet>
        </div>
    );
}
