import { sendAuthRequest } from "./authenticationAPI";
import { BASE_URL } from "@/constants/constants";

export async function fetchDrivers(subscriptionOption) {
    if (!subscriptionOption) return;

    try {
        const response = await sendAuthRequest(
            `${BASE_URL}/parent/search/drivers`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(subscriptionOption)
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Fetching drivers failed:", error);
    }
}

export async function getDriverDetail(driverId) {
    try {
        const response = await sendAuthRequest(
            `${BASE_URL}/detail/driver/${driverId}`
        );

        if (!response.ok) {
            console.error("기사 상세정보 가져오기 실패.");
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export async function postSubscribe(subscribeOption) {
    try {
        const response = await sendAuthRequest(`${BASE_URL}/parent/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subscribeOption)
        });

        if (response.ok) {
            console.log("Review submitted successfully.");
        } else {
            console.error("구독 요청 실패.");
        }
    } catch (error) {
        throw error;
    }
}

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
