package ifive.idrop.service;

import ifive.idrop.entity.Parent;
import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.ParentRepository;
import ifive.idrop.repository.PickUpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PickUpService {

    private final ParentRepository parentRepository;
    private final PickUpRepository pickUpRepository;

    public List<PickUpInfo> getValidPickUpInfosByParentId(Long parentId) {
        Parent parent = parentRepository.findByParentId(parentId)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));

        LocalDateTime now = LocalDateTime.now();

        return parent.getChildList().stream()
                .flatMap(child -> pickUpRepository.findPickupInfosByChildId(child.getId()).stream())
                .filter(pi -> pi.getPickUpSubscribe().getExpiredDate().isAfter(now))
                .collect(Collectors.toList());
    }
}
