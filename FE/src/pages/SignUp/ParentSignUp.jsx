import { Footer } from "../../components/common/Footer/Footer";
import styles from "./ParentSignUp.module.scss";
export default function ParentSignUp() {
    const handleChange = (e) => {
        console.log(e.target.value);
    };
    return (
        <div className={styles.container}>
            <span className={styles.title}>회원정보를 입력해주세요</span>
            <div className={styles.signForm}>
                <label className={styles.signLabel} htmlFor="userName">
                    이름
                </label>
                <input
                    className={styles.signInput}
                    type="text"
                    name="userName"
                    placeholder="이름을 입력해주세요."
                    onChange={handleChange}
                />
                <label className={styles.signLabel} htmlFor="phoneNumber">
                    전화번호
                </label>
                <input
                    className={styles.signInput}
                    type="number"
                    name="phoneNumber"
                    placeholder="전화번호를 입력해주세요."
                    onChange={handleChange}
                />
                <label className={styles.signLabel} htmlFor="id">
                    아이디
                </label>
                <input
                    className={styles.signInput}
                    type="text"
                    name="id"
                    placeholder="아이디를 입력해주세요."
                />
                <label className={styles.signLabel} htmlFor="password">
                    비밀번호
                </label>
                <input
                    className={styles.signInput}
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                />
                <fieldset className={styles.choiceBox}>
                    <div>
                        <input
                            className={styles.checkinput}
                            type="radio"
                            name="role"
                            value="father"
                        />
                        <label className={styles.signLabel} htmlFor="father">
                            부
                        </label>
                    </div>
                    <div>
                        <input
                            className={styles.checkinput}
                            type="radio"
                            name="role"
                            value="mother"
                        />
                        <label className={styles.signLabel} htmlFor="mother">
                            모
                        </label>
                    </div>
                </fieldset>
            </div>
            <div>
                <input
                    className={styles.checkinput}
                    type="checkbox"
                    id="service"
                    name="agree"
                />
                <label className={styles.signLabel} htmlFor="agree">
                    서비스 이용 약관에 동의해랏
                </label>
            </div>

            <Footer text="가입하기" />
        </div>
    );
}
