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

    public List<Notification> findAllNotification() {
        String query =
                "SELECT n FROM Notification n " +
                "WHERE n.pickUpTime <= CURRENT_TIME";
        return em.createQuery(query)
                .getResultList();
    }

    public void deleteById(Long notifiactoinId) {
        em.remove(notifiactoinId);
    }
}
