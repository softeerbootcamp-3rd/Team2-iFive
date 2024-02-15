package ifive.idrop.repository;

import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.enums.PickUpStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PickUpRepository {
    private final EntityManager em;

    public List<PickUp> findScheduledPickUpsByDriver(Long driverId) {
        TypedQuery<PickUp> query = em.createQuery(
                "SELECT p FROM PickUp p " +
                        "JOIN p.pickUpSubscribe ps " +
                        "JOIN ps.pickUpInfo pi " +
                        "JOIN pi.driver d " +
                        "WHERE ps.status = :status " +
                        "AND d.id >= :driverId " +
                        "AND p.reservedTime >= CURRENT_TIMESTAMP", PickUp.class);
        query.setParameter("status", PickUpStatus.ACCEPT)
                .setParameter("driverId", driverId);
        return query.getResultList();
    }
}
