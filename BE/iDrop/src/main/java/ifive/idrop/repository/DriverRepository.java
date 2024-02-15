package ifive.idrop.repository;

import ifive.idrop.entity.Driver;
import ifive.idrop.entity.PickUpInfo;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DriverRepository {
    private final EntityManager em;

    public Optional<Driver> findById(Long id) {
        return em.createQuery("select d From Driver d where d.id =: id", Driver.class)
                .setParameter("id", id)
                .getResultList()
                .stream()
                .findAny();
    }

    public List<PickUpInfo> findRunningPickInfo(Long driverId) {
        String query = "SELECT pui\n" +
                "FROM PickUpInfo pui\n" +
                "JOIN Child c ON pui.id = c.id\n" +
                "JOIN PickUp pu ON pui.id = pu.pickUpInfo.id\n" +
                "WHERE pui.driver.id =: driverId AND pu.startTime IS NOT NULL";
        return em.createQuery(query, PickUpInfo.class)
                .setParameter("driverId", driverId)
                .getResultList();
    }
}
