/**
 * @param {Object} props
 * @param {string} props.id 사용자 ID
 * @param {string} props.password 사용자 비밀번호
 * @returns {Promise<{success: boolean, data?: Object, message?: string}>}
 * 로그인 성공 시 { success: true, data: Object },
 * 실패 시 { success: false, message: string } 반환
 */
export async function login({ id, password }) {
    try {
        const response = await fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, password })
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                data
            };
        } else {
            // TODO 서버 에러코드 정해지면 에러처리
            return { success: false, message: "Login failed" };
        }
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, message: error.toString() };
    }
}
