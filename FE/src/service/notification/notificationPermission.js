import { getToken } from "firebase/messaging";
import { postFcmToken } from "./notificationAPI";
import { messaging } from "./foregroundMessage";

export async function handleAllowNotification() {
    try {
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            const token = await getToken(messaging, {
                vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
            });
            if (token) {
                console.log(`fcm 토큰 발급 완료 : ${token}`);
                postFcmToken(token);
            } else {
                alert(
                    "토큰 등록이 불가능 합니다. 생성하려면 권한을 허용해주세요"
                );
            }
        } else if (permission === "denied") {
            // alert(
            //     "web push 권한이 차단되었습니다. 알림을 사용하시려면 권한을 허용해주세요"
            // );
        }
    } catch (error) {
        console.error("푸시 토큰 가져오는 중에 에러 발생", error);
    }
}
