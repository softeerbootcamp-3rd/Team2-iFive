package ifive.idrop.repository;

import ifive.idrop.entity.Child;
import ifive.idrop.entity.PickUpInfo;
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

    public List<PickUpInfo> findRunningPickInfo(Long parentId) {
        String query = "SELECT pui\n" +
                "FROM PickUpInfo pui\n" +
                "JOIN Child c ON pui.child.id = c.id\n" +
                "JOIN PickUp pu ON pui.id = pu.pickUpInfo.id\n" +
                "WHERE c.parent.id =: parentId AND pu.startTime IS NOT NULL";
        return em.createQuery(query, PickUpInfo.class)
                .setParameter("parentId", parentId)
                .getResultList();
    }
}
