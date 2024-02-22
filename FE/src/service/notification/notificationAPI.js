import { authRequest } from "../authenticationAPI";

export async function postFcmToken(token) {
    const url = "/new";

    try {
        const response = await authRequest(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: token
        });
        if (!response.ok) {
            throw new Error("서버로 토큰 전송 실패함");
        }

        console.log("FCM 토큰 전송 성공 🔥");
    } catch (error) {
        console.error(error);
    }
}

export async function getAlarm() {
    const url = "/alarm";

    try {
        const response = await authRequest(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("알람 못받음 💦");
        }

        // console.log("알람 받음 🔥");
        return response;
    } catch (error) {
        console.error(error);
    }
}
