package ifive.idrop.controller;

import ifive.idrop.annotation.Login;

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
    public BaseResponse<List<CurrentPickUpResponse>> checkPickUpInfo(@Login Driver driver) {
        return driverService.getChildRunningInfo(driver);

    }

    @GetMapping("/subscribe/list")
    public List<DriverSubscribeInfoResponse> subscribeList(@Login Driver driver) {
        return driverService.subscribeList(driver.getId());
    }

}
