package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.PickUpInfoResponse;
import ifive.idrop.entity.*;
import ifive.idrop.entity.enums.Role;
import ifive.idrop.service.PickUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
@RestController
public class PickUpController {

    private final PickUpService pickUpService;

    @GetMapping("/pickup/valid")
    public List<PickUpInfoResponse> getValidPickUpInfos(@Login Users user) {
        Role role = user.getRole();
        List<PickUpInfo> pickUpInfos = null;
        List<PickUpInfoResponse> response = new ArrayList<>();
        if (role == Role.PARENT) {
            Parent parent = (Parent) user;
            pickUpInfos = pickUpService.getValidPickUpInfosByParentId(parent.getId());
        }
        for (PickUpInfo pi : pickUpInfos) {
            Child child = pi.getChild();
            PickUpSubscribe ps = pi.getPickUpSubscribe();

            response.add(PickUpInfoResponse.builder()
                    .startAddress(pi.getPickUpLocation().getStartAddress())
                    .endAddress(pi.getPickUpLocation().getEndAddress())
                    .childImage(child.getImage())
                    .childName(child.getName())
                    .startDate(ps.getModifiedDate())
                    .endDate(ps.getExpiredDate())
                    .build());
        }
        return response;
    }
}
