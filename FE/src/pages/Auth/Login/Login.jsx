import { useState } from "react";
import styles from "./Login.module.scss";
import { redirect, useNavigate } from "react-router-dom";
import { login } from "@/service/api";
import { getAccessToken, setToken } from "@/utils/auth";

export default function Login() {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { success, data, message } = await login({
            id: userId,
            password
        });

        if (success) {
            setToken("accessToken", data.accessToken);
            setToken("refreshToken", data.refreshToken);
            navigate("/");
        } else {
            console.error(message);
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>로그인</h1>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <label className={styles.loginLabel} htmlFor="id">
                    아이디
                </label>
                <input
                    className={styles.loginInput}
                    type="text"
                    name="id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="아이디를 입력해주세요."
                />
                <label className={styles.loginLabel} htmlFor="password">
                    비밀번호
                </label>
                <input
                    className={styles.loginInput}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호를 입력해주세요."
                />
                <button className={styles.loginSubmit} type="submit">
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

export function loginLoader() {
    const token = getAccessToken();
    if (token) {
        return redirect("/");
    }
    return null;
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return redirect("/login");
}
