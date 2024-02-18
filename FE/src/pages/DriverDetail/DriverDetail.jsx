import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Footer } from "../../components/common/Footer/Footer";
import { Header } from "../../components/common/Header/Header";
import { getDriverDetail } from "../../service/api";
import styles from "./DriverDetail.module.scss";

export default function DriverDetail() {
    const { driverId } = useParams();
    const { subscriptionOption } = useLocation();
    const navigate = useNavigate();

    const handleSubscriptionRequest = async () => {
        try {
            await postSubscribe({
                driverId,
                childName: "강승구",
                ...subscriptionOption
            });
            navigate("/subscription/confirmation");
        } catch (error) {
            console.error(error);
            alert("구독 요청 처리 중 오류가 발생했습니다.");
            navigate("/subscription/search");
        }
    };

    const detailInfoList = DRIVER_DETAIL_LIST.map((title) => (
        <DriverInfo key={title} title={title} content="" />
    ));

    return (
        <div className={styles.container}>
            <Header title="기사님 정보" />
            <section className={styles.main}>
                <section className={styles.profile}>
                    <div className={styles.profileImg}></div>
                    <article className={styles.profileTextWrapper}>
                        <h3 className={styles.name}>육종호</h3>
                        <h4 className={styles.age}>60세 (남)</h4>
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
