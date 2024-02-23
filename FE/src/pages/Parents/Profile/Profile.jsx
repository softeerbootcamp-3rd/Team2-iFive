import { Link, useNavigate } from "react-router-dom";
import styles from "./Profile.module.scss";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export default function Profile() {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate("/logout");
    };
    return (
        <div className={styles.container}>
            <Header title="내 정보" />

            <main className={styles.main}>
                <section className={styles.profile}>
                    <div className={styles.profileImg}></div>
                    <article className={styles.profileTextWrapper}>
                        <h3 className={styles.name}>{"아이 이름"}</h3>
                        <h4
                            className={styles.age}
                        >{`${"생년"} (${"성별"})`}</h4>
                    </article>
                </section>
                <section className={styles.infoList}>
                    <DetailInfo title="아이 특이사항" content="" />
                    <DetailInfo title="연락처" content="" />
                </section>
                <Footer text="로그아웃" onClick={handleLogout} />
            </main>
        </div>
    );
}

function DetailInfo({ title, content }) {
    return (
        <article className={styles.info}>
            <span className={styles.infoTitle}>{title}</span>
            <p className={styles.infoContent}>{content}</p>
        </article>
    );
}
