package ifive.idrop.controller;

import ifive.idrop.dto.DriverListRequest;
import ifive.idrop.dto.DriverSummary;
import ifive.idrop.dto.DriverListResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/parent")
public class ParentController {
    private final DriverService driverService;

    @PostMapping("/search/drivers")
    public DriverListResponse search(@RequestBody DriverListRequest driverListRequest) {
        DriverListResponse driverListResponse = new DriverListResponse();
        List<DriverSummary> driverSummaryList = driverListResponse.getDrivers();

        List<Driver> drivers = driverService.driverList(driverListRequest);

        for (Driver driver : drivers) {
            DriverSummary driverSummary = DriverSummary.builder()
                    .driverId(driver.getId())
                    .name(driver.getName())
                    .image(driver.getImage())
                    .introduction(driver.getIntroduction())
                    .score(driver.getScore())
                    .build();
            driverSummaryList.add(driverSummary);
        }
        return driverListResponse;
    }
}
