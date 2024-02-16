package ifive.idrop.repository;

import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.PickUpInfo;
import jakarta.persistence.TypedQuery;

import java.util.List;

import ifive.idrop.entity.PickUpLocation;
import ifive.idrop.entity.PickUpSubscribe;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class PickUpRepository {
    private final EntityManager em;

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
