package ifive.idrop.service;

import ifive.idrop.entity.Notification;
import ifive.idrop.fcm.AlarmMessage;
import ifive.idrop.fcm.NotificationUtill;
import ifive.idrop.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void checkPickUpTime() {
        List<Notification> notificationList = notificationRepository.findAllNotificationBeforeCurrentTime();
        for (Notification notification : notificationList) {
            NotificationUtill.createNotification(notification.getDriver()
                    , AlarmMessage.PICK_UP_PRE_INFO.getTitle(), AlarmMessage.PICK_UP_PRE_INFO.getMessage());
            notificationRepository.deleteById(notification.getId());
        }
    }
}
