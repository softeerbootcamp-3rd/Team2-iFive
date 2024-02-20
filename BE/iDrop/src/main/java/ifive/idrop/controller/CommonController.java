package ifive.idrop.controller;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.dto.response.CurrentPickUpResponse;
import ifive.idrop.dto.response.DriverDetailResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Parent;
import ifive.idrop.entity.Users;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.service.DriverService;
import ifive.idrop.service.ParentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class CommonController {
    private final DriverService driverService;
    private final ParentService parentService;

    @GetMapping("/detail/driver/{driverId}")
    public DriverDetailResponse detailDriver(@Login Users user, @PathVariable("driverId") Long driverId) {
        if (user instanceof Driver driver) {
            if (!driver.getId().equals(driverId)) {
                throw new CommonException(ErrorCode.UNAUTHORIZED_USER);
            }
        }
        return driverService.detail(driverId);
    }

    @GetMapping("/user/pickup/now")
    public BaseResponse checkPickUpInfo(@Login Users user) {
        if (user instanceof Parent) {
            return parentService.getChildRunningInfo((Parent) user);
        }

        if (user instanceof Driver) {
            return driverService.getAllChildRunningInfo((Driver) user);
        }

        throw new CommonException(ErrorCode.UNAUTHORIZED_USER);
    }
}
