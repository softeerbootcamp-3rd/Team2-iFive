package ifive.idrop.repository;

import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.entity.*;
import ifive.idrop.utils.RequestSchedule;
import ifive.idrop.utils.ScheduleUtils;
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

    public List<Driver> findDriversBySchedule(DriverListRequest driverListRequest) {
        RequestSchedule requestSchedule = ScheduleUtils.parseToList(driverListRequest.getSchedule());

        List<Driver> availableDrivers = new ArrayList<>();
        List<Driver> drivers = findAllDrivers();
        for (Driver driver : drivers) {
//            List<LocalDateTime> reservedSchedules = driver.getReservedScheduleList()
//                    .stream()
//                    .map(ReservedSchedule::getReservedTime)
//                    .toList();
            List<PickUp> pickUpList = pickUpRepository.findScheduledPickUpsByDriver(driver.getId());
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
}
