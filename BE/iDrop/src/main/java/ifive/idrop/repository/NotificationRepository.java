package ifive.idrop.repository;

import ifive.idrop.entity.Notification;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class NotificationRepository {
    private final EntityManager em;

    public void save(Notification notification) {
        em.persist(notification);
    }

    public List<Notification> findAllNotificationBeforeCurrentTime() {
        String query =
                "SELECT n FROM Notification n " +
                "WHERE n.pickUpAlarmTime <= CURRENT_TIME";
        return em.createQuery(query)
                .getResultList();
    }

    public void deleteById(Long notifiactionId) {
        em.remove(em.find(Notification.class, notifiactionId));
    }
}
