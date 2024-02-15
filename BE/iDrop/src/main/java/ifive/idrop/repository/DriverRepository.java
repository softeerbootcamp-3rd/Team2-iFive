package ifive.idrop.repository;

import ifive.idrop.entity.Driver;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class DriverRepository {
    private final EntityManager em;

    public Optional<Driver> findByDriverId(Long driverId) {
        Driver driver = em.find(Driver.class, driverId);
        return Optional.ofNullable(driver);
    }
}
