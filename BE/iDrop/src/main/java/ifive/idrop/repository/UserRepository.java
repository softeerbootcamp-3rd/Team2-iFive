package ifive.idrop.repository;

import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Parent;
import ifive.idrop.entity.Users;
import ifive.idrop.entity.enums.Role;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Repository
@RequiredArgsConstructor
public class UserRepository {
    private final EntityManager em;

    public void save(Users users) {
        em.persist(users);
    }

    public Optional<Users> findByUserId(String userId) {
//        // CriteriaBuilder 생성
//        CriteriaBuilder cb = em.getCriteriaBuilder();
//
//        // CriteriaQuery 생성 및 반환 타입 설정
//        CriteriaQuery<Driver> driverCq = cb.createQuery(Driver.class);
//        CriteriaQuery<Parent> parentCq = cb.createQuery(Parent.class);
//
//        // Root 엔티티 지정
//        Root<Driver> driverRoot = driverCq.from(Driver.class);
//        Root<Parent> parentRoot = parentCq.from(Parent.class);
//
//        // userId 조건 추가
//        driverCq.where(cb.equal(driverRoot.get("userId"), userId));
//        parentCq.where(cb.equal(parentRoot.get("userId"), userId));
//
//        // Query 실행
//        List<Driver> driverResultList = em.createQuery(driverCq).getResultList();
//        List<Parent> parentResultList = em.createQuery(parentCq).getResultList();

        List<Driver> driverResultList = em.createQuery("select d from Driver d where d.userId = :userId", Driver.class)
                .setParameter("userId", userId)
                .getResultList();

        List<Parent> parentResultList = em.createQuery("select p from Parent p where p.userId = :userId", Parent.class)
                .setParameter("userId", userId)
                .getResultList();


        // 하나의 List로 합치기
        List<Users> result = Stream.concat(driverResultList.stream(), parentResultList.stream()).toList();

        return result.stream().findAny();
    }

    public List<Driver> findDrivers() {
        return em.createQuery("select d from Driver d", Driver.class)
                .getResultList();
    }

    public List<Parent> findParents() {
        return em.createQuery("select p from Parent p", Parent.class)
                .getResultList();
    }
}
