package ifive.idrop.service;

import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.DriverInformation;
import ifive.idrop.dto.DriverListRequest;
import ifive.idrop.entity.Driver;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepository driverRepository;

    public List<Driver> driverList(DriverListRequest driverListRequest) {
        return driverRepository.findDriversBySchedule(driverListRequest);
    }

    @Transactional
    public BaseResponse<String> registerInfo(DriverInformation driverInformation) {
        Driver driver = driverRepository.findById(driverInformation.getDriverId())
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        driver.addAdditionalInfo(driverInformation);
        return BaseResponse.of("정보가 성공적으로 등록되었습니다.", driver.getName());
    }
}
