package ifive.idrop.repository;

import ifive.idrop.entity.Parent;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class ParentRepository {

    private final EntityManager em;

    public Optional<Parent> findByParentId(Long parentId) {
        Parent parent = em.find(Parent.class, parentId);
        return Optional.ofNullable(parent);
    }
}
