import { authRequest } from "./authenticationAPI";

export async function postSubscribeRequest(subscribeInfo) {
    try {
        const response = await authRequest(
            `${BASE_URL}/driver/subscribe/check`,
            {
                method: "POST",
                body: JSON.stringify(subscribeInfo)
            }
        );
        if (response.ok) {
            return await response.json();
        } else {
            console.error("거절 또는 수락 실패!");
        }
    } catch (error) {
        throw new Error(error);
    }
}
