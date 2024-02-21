import styles from "./Menu.module.scss";
import { MenuButton } from "./menuButton";
import iDropGreen from "@/assets/iDropGreen.svg";
import {
    DriverBottomSheet,
    ParentBottomSheet
} from "../../components/common/Bottomsheet/Bottomsheet";
import Location from "@/assets/Location.svg";
import Star from "@/assets/Star.svg";
import Success from "@/assets/Success.svg";
import User from "@/assets/user_icon.svg";
import Calender from "@/assets/calender.svg";
import Truck from "@/assets/truck.png";
import { getKidInfo } from "../../service/api";
import { useLoaderData } from "react-router-dom";

const userName = null;
export function DriverMenu() {
    const kidData = useLoaderData();

    return (
        <div className={styles.wrapper}>
            <img src={iDropGreen}></img>
            <div>
                <h1>안녕하세요, {userName || "육종호"}님 </h1>
                <span>오늘도 안전한 픽업 부탁드려요</span>
            </div>
            <div className={styles.menuContainer}>
                <MenuButton imgUrl={Calender} text="픽업 일정" route="" />
                <MenuButton
                    imgUrl={Truck}
                    text="픽업하기"
                    route="/pickup"
                    data={kidData}
                />
                <MenuButton imgUrl={User} text="프로필" route="" />
                <MenuButton imgUrl={Success} text="요청 목록" route="" />
            </div>
            <DriverBottomSheet data={kidData} />
        </div>
    );
}

export function ParentMenu() {
    const kidData = useLoaderData();

    console.log(kidData);

    return (
        <div className={styles.wrapper}>
            <img src={iDropGreen}></img>
            <div>
                <h1>안녕하세요, {userName || "육종호"}님 </h1>
                <span>오늘도 안전하게 픽업할게요</span>
            </div>
            <div className={styles.menuContainer}>
                <MenuButton
                    imgUrl={Location}
                    text="실시간 픽업"
                    route="/map?type=parent"
                    data={kidData}
                />
                <MenuButton
                    imgUrl={Success}
                    text="구독하기"
                    route="/subscription/search"
                />
                <MenuButton imgUrl={User} text="프로필" route="" />
                <MenuButton imgUrl={Star} text="이용내역" route="/history" />
            </div>
            <ParentBottomSheet kidData={kidData}></ParentBottomSheet>
        </div>
    );
}

const exampleData = [
    {
        childId: 1,
        childName: "김하나",
        childImage: "image",
        startDate: "2024-02-19T09:30:00",
        endDate: "2024-02-19T09:30:00",
        startLatitude: 37.5138649,
        startLongitude: 127.0295296,
        startAddress: "서울특별시 강남구 논현동 58-3 에티버스러닝 학동캠퍼스",
        endLatitude: 37.51559,
        endLongitude: 127.0316161,
        endAddress: "서울특별시 강남구 학동로31길 15 코마츠",
        pickUpStartTime: "2024-02-19T08:30:00",
        pickUpEndTime: "2024-02-19T09:30:00"
    }
];

export async function fetchParentChildData() {
    // const kidData = await getKidInfo("parent/pickup/now");
    const result = parseData(exampleData);
    return result;
}

export async function fetchDriverChildData() {
    // const kidData = await getKidInfo("driver/pickup/now");
    const result = parseData(exampleData);
    return result;
}

function parseData(kidData) {
    return kidData.map((element) => {
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

function removeCityPrefix(address) {
    return address.replace("서울특별시 ", "");
}

function formatDate(dateString) {
    return dateString.split("T")[0];
}

function formatTime(timeString) {
    return timeString.split("T")[1].slice(0, 5);
}
