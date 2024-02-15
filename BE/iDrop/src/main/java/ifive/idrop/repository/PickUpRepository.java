package ifive.idrop.repository;

import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.PickUpInfo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PickUpRepository {

    private final EntityManager em;

    public List<PickUpInfo> findPickupInfosByChildId(Long childId) {
        TypedQuery<PickUpInfo> query = em.createQuery(
                "SELECT pi FROM PickUpInfo  pi " +
                        "WHERE pi.child.id = :childId ", PickUpInfo.class);
        query.setParameter("childId", childId);

        return query.getResultList();
    }

    public List<PickUpInfo> findPickupInfosByDriverId(Long driverId) {
        TypedQuery<PickUpInfo> query = em.createQuery(
                "SELECT pi FROM PickUpInfo  pi " +
                        "WHERE pi.driver.id = :driverId ", PickUpInfo.class);
        query.setParameter("driverId", driverId);

        return query.getResultList();
    }
}
