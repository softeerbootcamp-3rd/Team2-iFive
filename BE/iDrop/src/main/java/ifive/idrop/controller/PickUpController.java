package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.PickUpInfoResponse;
import ifive.idrop.entity.*;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.service.PickUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PickUpController {

    private final PickUpService pickUpService;

    @GetMapping("/parent/pickup/valid")
    public List<PickUpInfoResponse> getValidPickUpInfos(@Login Users user) {
        if (!(user instanceof Parent)) {
            throw new CommonException(ErrorCode.INVALID_ROLE_OF_USER);
        }
        Parent parent = (Parent) user;
        List<PickUpInfo> pickUpInfos = pickUpService.getValidPickUpInfosByParentId(parent.getId());

        return pickUpInfos.stream().map(pi -> {
            Child child = pi.getChild();
            PickUpSubscribe ps = pi.getPickUpSubscribe();

            return PickUpInfoResponse.builder()
                    .startAddress(pi.getPickUpLocation().getStartAddress())
                    .endAddress(pi.getPickUpLocation().getEndAddress())
                    .childImage(child.getImage())
                    .childName(child.getName())
                    .startDate(ps.getModifiedDate())
                    .endDate(ps.getExpiredDate())
                    .build();
        }).collect(Collectors.toList());
    }
}
