package ifive.idrop.fcm;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import ifive.idrop.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationUtill {

    static public void createNotification(Users user, String title, String message) {
        if (user.getFcmToken() == null) {
            log.error("user = {}, FCM토큰이 없습니다", user.getUserId());
            return;
        }

        NotificationRequest request = NotificationRequest.builder()
                .title(title)
                .token(user.getFcmToken())
                .message(message)
                .build();
        try {
            sendNotification(request);
        } catch (ExecutionException e) {
            log.error("user = {}, FCM토큰이 없습니다", user.getUserId());
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    static private void sendNotification(NotificationRequest request) throws ExecutionException, InterruptedException {
        Message message = Message.builder()
                .setWebpushConfig(WebpushConfig.builder()
                        .setNotification(WebpushNotification.builder()
                                .setTitle(request.getTitle())
                                .setBody(request.getMessage())
                                .build())
                        .build())
                .setToken(request.getToken())
                .build();

        String response = FirebaseMessaging.getInstance().sendAsync(message).get();
        log.info(">>>>Send message = {}", response);
    }
}
