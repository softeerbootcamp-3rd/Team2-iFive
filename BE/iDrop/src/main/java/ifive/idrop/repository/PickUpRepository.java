package ifive.idrop.repository;

import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.enums.PickUpStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.entity.PickUpLocation;
import ifive.idrop.entity.PickUpSubscribe;


@Repository
@RequiredArgsConstructor
public class PickUpRepository {
    private final EntityManager em;

    public List<PickUp> findReservedPickUpsByDriver(Long driverId) {
        TypedQuery<PickUp> query = em.createQuery(
                "SELECT p FROM PickUp p " +
                        "JOIN p.pickUpInfo pi " +
                        "JOIN pi.pickUpSubscribe ps " +
                        "JOIN pi.driver d " +
                        "WHERE ps.status = :status " +
                        "AND d.id = :driverId " +
                        "AND p.reservedTime >= CURRENT_TIMESTAMP", PickUp.class);
        query.setParameter("status", PickUpStatus.ACCEPT)
                .setParameter("driverId", driverId);
        return query.getResultList();
    }

    public void savePickUpLocation(PickUpLocation location) {
        em.persist(location);
    }

    public void savePickUpSubscribe(PickUpSubscribe subscribe) {
        em.persist(subscribe);
    }

    public void savePickUpInfo(PickUpInfo pickUpInfo) {
        em.persist(pickUpInfo);
    }

    public void savePickUp(PickUp pick) {
        em.persist(pick);
    }

    public List<PickUp> findPickUpByPickUpInfoIdAndParentIdOrderByReservedTime(Long parentId, Long pickInfoId) {
        String query = "SELECT p FROM PickUp p\n" +
                "WHERE p.pickUpInfo.id =: pickInfoId\n" +
                "AND p.pickUpInfo.child.parent.id =: parentId\n" +
                "AND p.startTime IS NOT NULL\n" +
                "ORDER BY p.reservedTime DESC";
        return em.createQuery(query, PickUp.class)
                .setParameter("pickInfoId", pickInfoId)
                .setParameter("parentId", parentId)
                .getResultList();
    }
}
