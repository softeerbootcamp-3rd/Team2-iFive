package ifive.idrop.controller;

import ifive.idrop.annotation.Login;

import ifive.idrop.dto.request.SubscribeCheckRequest;
import ifive.idrop.dto.response.CurrentPickUpResponse;
import ifive.idrop.dto.request.DriverInformation;
import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.dto.response.DriverSubscribeInfoResponse;
import ifive.idrop.dto.response.ParentSubscribeInfoResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.concurrent.ExecutionException;


@RequiredArgsConstructor
@RestController
@RequestMapping("/driver")
public class DriverController {
    private final DriverService driverService;

    @PostMapping("/register/info")
    public BaseResponse<String> registerInfo(@Login Driver driver, @RequestBody DriverInformation driverInformation) {
        return driverService.registerInfo(driver.getId(), driverInformation);
    }

    @GetMapping("/pickup/now")
    public BaseResponse<List<CurrentPickUpResponse>> checkAllPickUpInfo(@Login Driver driver) {
        return driverService.getAllChildRunningInfo(driver);
    }

    @GetMapping("/pickup/now/child")
    public BaseResponse<List<CurrentPickUpResponse>> checkPickUpInfo(@Login Driver driver) {
        return driverService.getChildRunningInfo(driver);
    }

    @GetMapping("/subscribe/list")
    public List<DriverSubscribeInfoResponse> subscribeList(@Login Driver driver) {
        return driverService.subscribeList(driver.getId());
    }

    @PostMapping("/subscribe/check")
    public BaseResponse subscribeCheck(@Login Driver driver, @RequestBody SubscribeCheckRequest subscribeCheckRequest) throws ExecutionException, InterruptedException {
        return driverService.subscribeCheck(driver.getId(), subscribeCheckRequest);
    }
}
