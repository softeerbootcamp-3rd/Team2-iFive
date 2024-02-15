package ifive.idrop.controller;

import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.dto.response.DriverListResponse;
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

    @GetMapping("/search/drivers")
    public DriverListResponse search(@RequestBody DriverListRequest driverListRequest) {
        DriverListResponse driverListResponse = new DriverListResponse();

        List<Driver> drivers = driverService.searchAvailableDrivers(driverListRequest);

        for (Driver driver : drivers) {
            driverListResponse.addDriverSummary(driver.getSummary());
        }
        return driverListResponse;
    }

    @GetMapping("/test")
    public void test(@RequestBody DriverListRequest driverListRequest) {
        System.out.println(driverListRequest.getSchedule());
    }
}
