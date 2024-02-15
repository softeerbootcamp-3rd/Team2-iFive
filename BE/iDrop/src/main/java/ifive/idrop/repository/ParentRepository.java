package ifive.idrop.repository;

import ifive.idrop.entity.Child;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

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
}
