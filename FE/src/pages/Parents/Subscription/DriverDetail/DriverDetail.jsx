import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { getDriverDetail, postSubscribe } from "@/service/parentsAPI";
import styles from "./DriverDetail.module.scss";

export default function DriverDetail() {
    const { subscriptionOption } = useLocation();
    const navigate = useNavigate();
    const {
        driverId,
        name,
        phoneNumber,
        gender,
        birth,
        image,
        career,
        introduction,
        drivingScore,
        starRate,
        numberOfReviews
    } = useLoaderData();

    const handleSubscriptionRequest = async () => {
        try {
            await postSubscribe({
                driverId,
                ...subscriptionOption
            });
            navigate("/subscription/confirmation");
        } catch (error) {
            console.error(error);
            alert("구독 요청 처리 중 오류가 발생했습니다.");
            navigate("/subscription/search");
        }
    };

    function getContentForTitle(title) {
        switch (title) {
            case "자기소개":
                return introduction;
            case "경력":
                return career;
            case "연락처":
                return phoneNumber;
            case "별점":
                return `${starRate} (${numberOfReviews} 리뷰)`;
            default:
                return ""; // 기본값, 해당하는 title이 없는 경우
        }
    }

    const detailInfoList = DRIVER_DETAIL_LIST.map((title) => (
        <DriverInfo
            key={title}
            title={title}
            content={getContentForTitle(title)}
        />
    ));

    return (
        <div className={styles.container}>
            <Header title="기사님 정보" />
            <section className={styles.main}>
                <section className={styles.profile}>
                    <div className={styles.profileImg}></div>
                    <article className={styles.profileTextWrapper}>
                        <h3 className={styles.name}>{name}</h3>
                        <h4 className={styles.age}>{`${birth} (${gender})`}</h4>
                    </article>
                </section>
                <section className={styles.infoList}>{detailInfoList}</section>
            </section>
            <Footer text="확인" onClick={handleSubscriptionRequest} />
        </div>
    );
}

function DriverInfo({ title, content }) {
    return (
        <article className={styles.info}>
            <span className={styles.infoTitle}>{title}</span>
            <p className={styles.infoContent}>{content}</p>
        </article>
    );
}

export async function loader({ params }) {
    const driverInfoData = await getDriverDetail(params.driverId);
    return driverInfoData;
}

const DRIVER_DETAIL_LIST = ["자기소개", "경력", "연락처", "별점", "후기"];
