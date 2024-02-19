package ifive.idrop.repository;

import ifive.idrop.entity.*;
import ifive.idrop.entity.enums.PickUpStatus;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


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

    public Optional<PickUp> findById(Long pickUpId) {
        return Optional.ofNullable(em.find(PickUp.class, pickUpId));
    }

    public void savePickUpStartInfo(Long pickupId, String startImage, LocalDateTime startTime, String startMessage) {
        PickUp pickUp = Optional.ofNullable(em.find(PickUp.class, pickupId))
                .orElseThrow(() -> new CommonException(ErrorCode.PICKUP_NOT_FOUND));

        pickUp.updateStartPickUpInfo(startImage, startTime, startMessage);
        em.merge(pickUp);
    }
}
