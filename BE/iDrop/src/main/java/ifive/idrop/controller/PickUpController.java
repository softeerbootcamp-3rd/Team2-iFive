package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.PickUp;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.exception.ErrorResponse;
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

    @PostMapping("/pickUp")
    public BaseResponse<String> getStartPickUpInfoFromDriver(@Login Driver driver, Long pickUpId, @ModelAttribute MultipartFile image) {
        PickUp pickUp = pickUpService.findByPickUpId(pickUpId);
        if (!pickUp.isDriver(driver)) { //해당 기사의 픽업이 아님
            throw new CommonException(ErrorCode.DRIVER_NOT_MATCHED);
        }
        try {
            pickUpService.pickUpStart(pickUp.getId(), image);
        } catch (IOException e) {
            //TODO 에러 핸들링 고민
        }
        log.info("pickUp Start - driverId = {}, pickUpId = {}", driver.getId(), pickUp.getId());
        return BaseResponse.success();
    }
}
