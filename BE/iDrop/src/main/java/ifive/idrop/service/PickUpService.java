package ifive.idrop.service;

import ifive.idrop.entity.Child;
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
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PickUpService {

    private final ParentRepository parentRepository;
    private final PickUpRepository pickUpRepository;

    public List<PickUpInfo> getValidPickUpInfosByParentId(Long parentId) {
        List<PickUpInfo> response = new ArrayList<>();

        Parent parent = parentRepository.findByParentId(parentId)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));

        List<Child> childList = parent.getChildList();
        for (Child child : childList) {
            List<PickUpInfo> pickupInfosByChildId = pickUpRepository.findPickupInfosByChildId(child.getId());
            for (PickUpInfo pi : pickupInfosByChildId) {
                if (pi.getPickUpSubscribe().getExpiredDate().isAfter(LocalDateTime.now())) {
                    response.add(pi);
                }
            }
        }
        return response;
    }
}
