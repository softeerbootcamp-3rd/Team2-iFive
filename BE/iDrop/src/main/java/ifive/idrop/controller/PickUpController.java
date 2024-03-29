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
import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;

@Slf4j
@RequiredArgsConstructor
@RestController
public class PickUpController {

    private final PickUpService pickUpService;

    @PostMapping("/driver/pickup")
    public BaseResponse<String> startOrEndPickUp(@Login Driver driver, Long childId, @ModelAttribute MultipartFile image, String message) throws ExecutionException, InterruptedException {
        PickUp pickUp = pickUpService.findCurrentPickUp(driver.getId(), childId)
                .orElseThrow(() -> new CommonException(ErrorCode.CURRENT_PICKUP_NOT_FOUND));
        try {
            pickUpService.saveStartOrEndPickUp(pickUp.getId(), image, message);
        } catch (IOException e) {
            new CommonException(ErrorCode.IMAGE_UPLOAD_ERROR);
        }
        return BaseResponse.success();
    }
}
