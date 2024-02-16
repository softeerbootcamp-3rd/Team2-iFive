package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.BaseResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Parent;
import ifive.idrop.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/driver")
public class DriverController {
    private final DriverService driverService;

    @GetMapping("/pickup/now")
    public BaseResponse checkPickUpInfo(@Login Driver driver) {
        return driverService.getChildRunningInfo(driver);
    }
}
