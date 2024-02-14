import { Footer } from "../../components/Common/Footer/Footer";
import { Header } from "../../components/common/Header/Header";
import styles from "./DriverDetail.module.scss";

const DRIVER_DETAIL_LIST = ["자기소개", "경력", "연락처", "별점", "후기"];

export default function DriverDetail() {
    const detailInfoList = DRIVER_DETAIL_LIST.map((title) => (
        <article className={styles.info}>
            <span className={styles.infoTitle}>{title}</span>
            <p className={styles.infoContent}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
                saepe ut libero pariatur. Et dolorum ut delectus maiores magnam
                distinctio impedit in accusantium placeat mollitia hic iusto,
                minima molestias quidem!
            </p>
        </article>
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
            <Footer text="확인" />
        </div>
    );
}
