package ifive.idrop.repository;

import ifive.idrop.entity.Users;
import ifive.idrop.entity.enums.Role;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final EntityManager em;

    public void save(Users users) {
        em.persist(users);
    }

    public Users findOne(Long id) {
        return em.find(Users.class, id);
    }

    public List<Users> findDrivers() {
        return em.createQuery("select u from Users u where u.role = :role", Users.class)
                .setParameter("role", Role.DRIVER.getRole())
                .getResultList();
    }

    public List<Users> findParents() {
        return em.createQuery("select u from Users u where u.role = :role", Users.class)
                .setParameter("role", Role.PARENT.getRole())
                .getResultList();
    }
}
