import styles from "./Login.module.scss";

export default function Login() {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>로그인</h1>
            <form action="" className={styles.loginForm}>
                <label className={styles.loginLabel} htmlFor="id">
                    아이디
                </label>
                <input
                    className={styles.loginInput}
                    type="text"
                    name="id"
                    placeholder="아이디를 입력해주세요."
                />
                <label className={styles.loginLabel} htmlFor="password">
                    비밀번호
                </label>
                <input
                    className={styles.loginInput}
                    type="password"
                    name="password"
                    placeholder="비밀번호를 입력해주세요."
                />
                <button className={styles.loginSubmit} type="button">
                    로그인
                </button>
            </form>
            <nav className={styles.nav}>
                <button className={styles.navBtn}>ID 찾기</button>
                <button className={styles.navBtn}>PW 찾기</button>
                <button className={styles.navBtn}>회원가입</button>
            </nav>
        </main>
    );
}
