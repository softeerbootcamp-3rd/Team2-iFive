package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.PickUp;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.service.PickUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PickUpController {

    private final PickUpService pickUpService;

    @PostMapping("/pickup")
    public BaseResponse<String> startPickUp(@Login Driver driver, Long childId, @ModelAttribute MultipartFile image, String startMessage) {
        PickUp pickUp = pickUpService.findCurrentPickUp(driver.getId(), childId)
                .orElseThrow(() -> new CommonException(ErrorCode.CURRENT_PICKUP_NOT_FOUND));
        try {
            pickUpService.pickUpStart(pickUp.getId(), image, startMessage);
        } catch (IOException e) {
            new CommonException(ErrorCode.IMAGE_UPLOAD_ERROR);
        }
        log.info("pickUp Start - driverId = {}, pickUpId = {}", driver.getId(), pickUp.getId());
        return BaseResponse.success();
    }
}
