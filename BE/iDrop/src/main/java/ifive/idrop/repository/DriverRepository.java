package ifive.idrop.repository;

import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.entity.*;
import ifive.idrop.util.RequestSchedule;
import ifive.idrop.util.ScheduleUtils;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.PickUpInfo;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DriverRepository {
    private final EntityManager em;
    private final PickUpRepository pickUpRepository;

    public Optional<Driver> findById(Long id) {
        return Optional.ofNullable(em.find(Driver.class, id));
    }

    public List<Driver> findAllDrivers() {
        return em.createQuery("select d from Driver d", Driver.class)
                .getResultList();
    }

    public List<PickUpInfo> findRunningPickInfo(Long driverId) {
        String query = "SELECT pui\n" +
                "FROM PickUpInfo pui\n" +
                "JOIN PickUp pu ON pui.id = pu.pickUpInfo.id\n" +
                "WHERE pui.driver.id =: driverId\n" +
                "AND pu.startTime IS NOT NULL\n" +
                "AND pu.endTime IS NULL";
        return em.createQuery(query, PickUpInfo.class)
                .setParameter("driverId", driverId)
                .getResultList();
    }
}
