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

    public Optional<Driver> findById(Long id) {
        return em.createQuery("select d From Driver d where d.id =: id", Driver.class)
                .setParameter("id", id)
                .getResultList()
                .stream()
                .findAny();
    }
}
