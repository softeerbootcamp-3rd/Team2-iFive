package ifive.idrop.controller;

import ifive.idrop.dto.*;
import ifive.idrop.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/driver")
public class DriverController {
    private final DriverService driverService;
    @PostMapping("/register/info")
    public BaseResponse<String> search(@RequestBody DriverInformation driverInformation) {
        return driverService.registerInfo(driverInformation);
    }
}
