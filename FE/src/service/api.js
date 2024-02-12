import { logout } from "../pages/Login/Login";
import { getAccessToken, getRefreshToken } from "../utils/auth";

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

// TODO - 배포 주소로 변경
async function refreshAccessToken(refreshToken) {
    const response = await fetch("/api/refresh_token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken })
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        return data.accessToken;
    } else {
        throw new Error("Refresh token is invalid or expired.");
    }
}

async function sendAuthRequest(url, options = {}) {
    const accessToken = getAccessToken();
    if (accessToken) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`
        };
    }

    let response = await fetch(url, options);

    // TODO - 액세스 토큰이 만료되었을 경우 로직, status 코드 백엔드에 따라 변경 필요
    if (response.status === 401) {
        try {
            const newAccessToken = await refreshAccessToken();
            options.headers.Authorization = `Bearer ${newAccessToken}`;
            response = await fetch(url, options);
        } catch (error) {
            console.error("Session expired. User needs to login again.");
            logout();
        }
    }

    return response;
}
// 위의 두 함수 사용 예시.
async function submitReview(reviewData) {
    try {
        const response = await sendRequest("/api/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(reviewData)
        });

        if (response.ok) {
            console.log("Review submitted successfully.");
        } else {
            console.error("Failed to submit review.");
        }
    } catch (error) {
        console.error("Error submitting review:", error);
    }
}
