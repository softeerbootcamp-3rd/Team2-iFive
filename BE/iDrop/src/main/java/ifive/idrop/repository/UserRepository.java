package ifive.idrop.repository;

import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Parent;
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

//    public Users findByUserId(String userId) {
//        return em.createQuery("select u from Users u where u.userId = :userId", Users.class)
//                .setParameter("userId", userId)
//                .getSingleResult();
//    }

    public List<Driver> findDrivers() {
        return em.createQuery("select d from Driver d", Driver.class)
                .getResultList();
    }

    public List<Parent> findParents() {
        return em.createQuery("select p from Parent p", Parent.class)
                .getResultList();
    }
}
