package ifive.idrop.repository;

import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.entity.*;
import ifive.idrop.util.RequestSchedule;
import ifive.idrop.util.ScheduleUtils;
import ifive.idrop.entity.Driver;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

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

    public List<Driver> findDriversBySchedule(DriverListRequest driverListRequest) {
        RequestSchedule requestSchedule = ScheduleUtils.parseToList(driverListRequest.getSchedule());

        List<Driver> availableDrivers = new ArrayList<>();
        List<Driver> drivers = findAllDrivers();
        for (Driver driver : drivers) {
            List<PickUp> pickUpList = pickUpRepository.findReservedPickUpsByDriver(driver.getId());
            List<LocalDateTime> reservedSchedule = pickUpList.stream()
                    .map(PickUp::getReservedTime)
                    .toList();
            List<WorkHours> workHoursList = driver.getWorkHoursList();
            if (requestSchedule.isAvailable(workHoursList, reservedSchedule)) {
                availableDrivers.add(driver);
            }
        }
        return availableDrivers;
    }
    public List<Object[]> findAllRunningPickUpInfoOrderByreservedTimeASC(Long driverId) {
        String query = "SELECT pui, pu.reservedTime\n" +
                "FROM PickUpInfo pui\n" +
                "JOIN PickUp pu ON pui.id = pu.pickUpInfo.id\n" +
                "WHERE pui.driver.id =: driverId\n" +
                "AND FUNCTION('DATE', pu.reservedTime) = :currentDate\n"+
                "AND pu.endTime IS NULL\n" +
                "ORDER BY pu.reservedTime ASC";
        return em.createQuery(query)
                .setParameter("driverId", driverId)
                .setParameter("currentDate", LocalDate.now())
                .getResultList();
    }

    public List<Object[]> findRunningPickUpInfo(Long driverId) {
        String query = "SELECT pui, pu.reservedTime\n" +
                "FROM PickUpInfo pui\n" +
                "JOIN PickUp pu ON pui.id = pu.pickUpInfo.id\n" +
                "WHERE pui.driver.id =: driverId\n" +
                "AND pu.startTime IS NOT NULL\n" +
                "AND pu.endTime IS NULL\n" +
                "AND pu.reservedTime <= CURRENT_TIMESTAMP";

        return em.createQuery(query)
                .setParameter("driverId", driverId)
                .getResultList();
    }

    public List<Object[]> findRemainingPickUpInfo(Long driverId) {
        String query = "SELECT pui, pu.reservedTime " +
                "FROM PickUpInfo pui " +
                "JOIN PickUp pu ON pui.id = pu.pickUpInfo.id " +
                "WHERE pui.driver.id = :driverId " +
                "AND FUNCTION('DATE', pu.reservedTime) = :currentDate " +
                "AND pu.endTime IS NULL " +
                "AND pu.reservedTime > :oneHourBeforeNow";

        return em.createQuery(query, Object[].class)
                .setParameter("driverId", driverId)
                .setParameter("currentDate", LocalDate.now())
                .setParameter("oneHourBeforeNow", LocalDateTime.now().minusHours(1))
                .getResultList();
    }

}