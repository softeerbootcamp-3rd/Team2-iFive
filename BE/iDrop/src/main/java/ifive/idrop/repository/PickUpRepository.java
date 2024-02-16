package ifive.idrop.repository;

import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.entity.PickUpLocation;
import ifive.idrop.entity.PickUpSubscribe;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

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
}
