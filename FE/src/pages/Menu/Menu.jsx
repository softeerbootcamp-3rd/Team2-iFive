import { useLoaderData } from "react-router-dom";
import { getKidInfo } from "@/service/childrenAPI";
import styles from "./Menu.module.scss";
import { MenuButton } from "./MenuButton/MenuButton";
import iDropGreen from "@/assets/iDropGreen.svg";
import {
    DriverBottomSheet,
    ParentBottomSheet
} from "@/components/Bottomsheet/Bottomsheet";
import {
    removeCityPrefix,
    formatDate,
    formatTime
} from "../../utils/parseData";
import Location from "@/assets/Location.svg";
import Star from "@/assets/Star.svg";
import Success from "@/assets/Success.svg";
import User from "@/assets/user_icon.svg";
import Calender from "@/assets/calender.svg";
import Truck from "@/assets/truck.png";
import { handleAllowNotification } from "../../service/notification/notificationPermission";

const userName = null;
export function DriverMenu() {
    const childrenData = useLoaderData();

    return (
        <div className={styles.wrapper}>
            <img src={iDropGreen}></img>
            <div>
                <h1>안녕하세요, {childrenData.userName || "김상민"}님 </h1>
                <span>오늘도 안전한 픽업 부탁드려요</span>
            </div>
            <div className={styles.menuContainer}>
                <MenuButton imgUrl={Calender} text="픽업 일정" route="" />
                <MenuButton
                    imgUrl={Truck}
                    text="픽업하기"
                    route="/select"
                    data={childrenData}
                />
                <MenuButton imgUrl={User} text="프로필" route="/profile" />
                <MenuButton
                    imgUrl={Success}
                    text="요청 목록"
                    route="/pickup/request"
                />
            </div>
            <DriverBottomSheet childrenData={childrenData} />
        </div>
    );
}

export function ParentMenu() {
    const childrenData = useLoaderData();
    console.log(childrenData);

    return (
        <div className={styles.wrapper}>
            <img src={iDropGreen} alt="logo" />
            <div>
                <h1>안녕하세요, {childrenData.userName || "이유진"}님 </h1>
                <span>오늘도 안전하게 픽업할게요</span>
            </div>
            <div className={styles.menuContainer}>
                <MenuButton
                    imgUrl={Location}
                    text="실시간 픽업"
                    route="/map?type=parent"
                    data={childrenData}
                />
                <MenuButton
                    imgUrl={Success}
                    text="구독하기"
                    route="/subscription/search"
                />
                <MenuButton imgUrl={User} text="프로필" route="/profile" />
                <MenuButton imgUrl={Star} text="이용내역" route="/history" />
            </div>

            <ParentBottomSheet childrenData={childrenData} />
        </div>
    );
}

export async function fetchMenuData() {
    await handleAllowNotification();
    const childrenData = await getKidInfo("user/pickup/now");
    const result = parseData(childrenData.data);

    return result;
}

function parseData(childrenData) {
    return childrenData.map((element) => {
        return {
            ...element,
            startAddress: removeCityPrefix(element.startAddress),
            endAddress: removeCityPrefix(element.endAddress),
            startDate: formatDate(element.startDate),
            endDate: formatDate(element.endDate),
            pickUpStartTime: formatTime(element.pickUpStartTime),
            pickUpEndTime: formatTime(element.pickUpEndTime)
        };
    });
}
