import { Header } from "@/components/common/Header/Header";
import styles from "./DriverList.module.scss";
import { DriverItem } from "@/components/DriverList/DriverItem";

const mock = [
    {
        name: "육종호",
        career: "무사고 30년",
        rating: 5.0,
        ratingCnt: 323,
        imgSrc: "",
        introduce:
            "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다."
    },
    {
        name: "육종호",
        career: "무사고 30년",
        rating: 5.0,
        ratingCnt: 323,
        imgSrc: "",
        introduce:
            "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다."
    },
    {
        name: "육종호",
        career: "무사고 30년",
        rating: 5.0,
        ratingCnt: 323,
        imgSrc: "",
        introduce:
            "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다."
    },
    {
        name: "육종호",
        career: "무사고 30년",
        rating: 5.0,
        ratingCnt: 323,
        imgSrc: "",
        introduce:
            "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다."
    },
    {
        name: "육종호",
        career: "무사고 30년",
        rating: 5.0,
        ratingCnt: 323,
        imgSrc: "",
        introduce:
            "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다."
    },
    {
        name: "육종호",
        career: "무사고 30년",
        rating: 5.0,
        ratingCnt: 323,
        imgSrc: "",
        introduce:
            "아이 셋을 잘 길러낸 아버지 입니다. 아이들을 좋아해서 은퇴하고 픽업 기사로 일하고 있습니다."
    }
];

export default function DriverList() {
    return (
        <main className={styles.container}>
            <Header title="기사님 목록" />
            <section className={styles.list}>
                {mock.map((data, index) => (
                    <DriverItem key={"driverDetail-" + index} {...data} />
                ))}
            </section>
        </main>
    );
}
