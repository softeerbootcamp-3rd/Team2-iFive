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

    public Optional<PickUp> findPickUpById(Long pickUpId) {
        return Optional.ofNullable(em.find(PickUp.class, pickUpId));
    }

    public Optional<PickUpInfo> findPickUpInfoById(Long pickUpInfoId) {
        return Optional.ofNullable(em.find(PickUpInfo.class, pickUpInfoId));
    }

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

    public List<PickUpInfo> findPickUpInfoByParentId(Long parentId) {
        TypedQuery<PickUpInfo> query = em.createQuery(
                "SELECT pui FROM PickUpInfo pui " +
                        "JOIN pui.pickUpSubscribe ps " +
                        "JOIN pui.child c " +
                        "JOIN c.parent p " +
                        "WHERE p.id = :parentId " +
                        "ORDER BY CASE WHEN ps.expiredDate IS NULL THEN 1 ELSE 0 END, " +
                        "ps.expiredDate DESC", PickUpInfo.class);
        query.setParameter("parentId", parentId);
        return query.getResultList();
    }

    public List<PickUpInfo> findPickUpInfoByDriverId(Long driverId) {
        TypedQuery<PickUpInfo> query = em.createQuery(
                "SELECT pui FROM PickUpInfo pui " +
                        "JOIN pui.pickUpSubscribe ps " +
                        "JOIN pui.driver d " +
                        "WHERE d.id = :driverId " +
                        "AND ps.status <> :cancel " +
                        "AND ps.status <> :decline " +
                        "ORDER BY ps.requestDate DESC", PickUpInfo.class);
        query.setParameter("driverId", driverId)
                .setParameter("cancel", PickUpStatus.CANCEL)
                .setParameter("decline", PickUpStatus.DECLINE);
        return query.getResultList();
    }

    public void savePickUpStartInfo(Long pickupId, String startImage, String startMessage) {
        PickUp pickUp = Optional.ofNullable(em.find(PickUp.class, pickupId))
                .orElseThrow(() -> new CommonException(ErrorCode.PICKUP_NOT_FOUND));

        pickUp.updateStartPickUpInfo(startImage, startMessage);
        em.merge(pickUp);
    }

    public void savePickUpEndInfo(Long pickupId, String endImage, String endMessage) {
        PickUp pickUp = Optional.ofNullable(em.find(PickUp.class, pickupId))
                .orElseThrow(() -> new CommonException(ErrorCode.PICKUP_NOT_FOUND));

        pickUp.updateEndPickUpInfo(endImage, endMessage);
        em.merge(pickUp);
    }

    /**
     * driverId로 현재 해당 기사의 업무 시간에 해당하는 PickUp들 찾기
     * @param driverId
     * @return List<PickUp>
     */
    public List<PickUp> findPickUpsByDriverIdWithCurrentTimeInReservedRange(Long driverId) {
        LocalDateTime now = LocalDateTime.now();

        // 현재 시간이 reservedTime ~ reservedTime+1시간에 해당하는 PickUp들 찾기
        String jpql = "SELECT p FROM PickUp p WHERE p.pickUpInfo.driver.id = :driverId " +
                "AND (p.reservedTime - 10 MINUTE) <= :now AND :now <= (p.reservedTime + 1 HOUR)";

        TypedQuery<PickUp> query = em.createQuery(jpql, PickUp.class);
        query.setParameter("driverId", driverId);
        query.setParameter("now", now);

        return query.getResultList();
    }
}
