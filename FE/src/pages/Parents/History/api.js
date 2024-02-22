import { BASE_URL } from "@/constants/constants";
import { sendAuthRequest } from "@/service/api";

export async function getSubscriptionHistoryList() {
    try {
        const response = await sendAuthRequest(
            `${BASE_URL}/parent/subscribe/list`
        );

        if (!response.ok) {
            console.error("이용내역 가져오기 실패.");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
