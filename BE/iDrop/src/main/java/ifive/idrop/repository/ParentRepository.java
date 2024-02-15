package ifive.idrop.repository;

import ifive.idrop.entity.Child;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ParentRepository {
    private final EntityManager em;

    public Optional<Child> findChild(Long parentId, String childName) {
        return em.createQuery("SELECT c FROM Child c where c.parent.id =: parentId AND c.name =: childName", Child.class)
                .setParameter("parentId", parentId)
                .setParameter("childName", childName)
                .getResultList()
                .stream()
                .findAny();
    }

    public List<Child> findRunningChild(Long parentId) {
        String query = "SELECT c\n" +
                "FROM Child c\n" +
                "JOIN PickUpInfo pui ON c.id = pui.child.id\n" +
                "JOIN PickUp pu ON pui.id = pu.pickupInfoId\n" +
                "WHERE c.parentId = :parentId AND pu.reservedTime IS NOT NULL";
        return em.createQuery(query, Child.class)
                .setParameter("parentId", parentId)
                .getResultList();
    }
}
