package ifive.idrop.websocket;

import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.PickUpLocation;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Repository
@RequiredArgsConstructor
public class PickUpInfoRepository {

    private final EntityManager em;

    /**
     * driverId로 현재 해당 기사의 업무 시간에 해당하는 PickUp 찾기
     * @param driverId
     * @return PickUp
     */
    public Optional<PickUp> findPickUpByDriverIdWithCurrentTimeInReservedWindow(Long driverId) {
        LocalDateTime now = LocalDateTime.now();

        //현재 시간이 reservedTime ~ reservedTime+1시간 에 해당하는 PickUp 찾기
        String jpql = "SELECT p FROM PickUp p WHERE p.pickUpInfo.driver.id = :driverId " +
                "AND (p.reservedTime - 10 MINUTE) <= :now AND :now <= (p.reservedTime + 1 HOUR)";

        TypedQuery<PickUp> query = em.createQuery(jpql, PickUp.class);
        query.setParameter("driverId", driverId);
        query.setParameter("now", now);

        try {
            return Optional.ofNullable(query.getSingleResult());
        } catch (NoResultException e) {
            return Optional.empty();
        }
    }

    /**
     * pickUpId로 해당 픽업의 child id, parent id 찾기
     * @param pickUpId
     * @return Object[]  [0]: childId, [1]: parentId
     */
    public Object[] findChildAndParentIdByPickUp(Long pickUpId) {
        String jpql = "SELECT c.id, p.id FROM PickUp pu " +
                "JOIN pu.pickUpInfo.child c " +
                "JOIN c.parent p " +
                "WHERE pu.id = :pickUpId";

        TypedQuery<Object[]> query = em.createQuery(jpql, Object[].class);
        query.setParameter("pickUpId", pickUpId);

        return query.getSingleResult();
    }

    public PickUpLocation getPickUpLocation(Long pickUpId) {
        String jpql = "SELECT pi.pickUpLocation FROM PickUp p " +
                "JOIN p.pickUpInfo pi " +
                "WHERE p.id = :pickUpId";

        TypedQuery<PickUpLocation> query = em.createQuery(jpql, PickUpLocation.class);
        query.setParameter("pickUpId", pickUpId);

        return query.getSingleResult();

    }

}
