package ifive.idrop.service;

import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.CurrentPickUpResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.Parent;
import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DriverService {
    private final DriverRepository driverRepository;

    public BaseResponse<List<CurrentPickUpResponse>> getChildRunningInfo(Driver driver) {
        List<PickUpInfo> runningPickInfo = driverRepository.findRunningPickInfo(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(CurrentPickUpResponse::of)
                        .toList());
    }
}
