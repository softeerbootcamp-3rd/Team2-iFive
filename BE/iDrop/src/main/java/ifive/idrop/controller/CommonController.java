package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.response.DriverDetailResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Users;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CommonController {
    private final DriverService driverService;

    @GetMapping("/detail/driver/{driverId}")
    public DriverDetailResponse detailDriver(@Login Users user, @PathVariable("driverId") Long driverId) {
        if (user instanceof Driver driver) {
            if (!driver.getId().equals(driverId)) {
                throw new CommonException(ErrorCode.UNAUTHORIZED_USER);
            }
        }
        return driverService.detail(driverId);
    }
}
