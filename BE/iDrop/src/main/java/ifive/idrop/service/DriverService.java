package ifive.idrop.service;

import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.dto.request.DriverInformation;
import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.dto.response.DriverDetailResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.DriverRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ifive.idrop.dto.response.CurrentPickUpResponse;
import ifive.idrop.entity.PickUpInfo;

import java.time.LocalDateTime;
import java.util.List;



@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepository driverRepository;

    @Transactional(readOnly = true)
    public List<Driver> searchAvailableDrivers(DriverListRequest driverListRequest) {
        return driverRepository.findDriversBySchedule(driverListRequest);
    }

    @Transactional
    public BaseResponse<String> registerInfo(Long driverId, DriverInformation driverInformation) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        driver.addAdditionalInfo(driverInformation);
        return BaseResponse.of("정보가 성공적으로 등록되었습니다.", driver.getName());
    }

    @Transactional(readOnly = true)
    public DriverDetailResponse detail(Long driverId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));
        return driver.getDetail();
    }


    @Transactional(readOnly = true)
    public BaseResponse<List<CurrentPickUpResponse>> getAllChildRunningInfo(Driver driver) {
        List<Object[]> runningPickInfo = driverRepository.findAllRunningPickUpInfo(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(o -> CurrentPickUpResponse.of((PickUpInfo) o[0], (LocalDateTime) o[1]))
                        .toList());
    }

    @Transactional(readOnly = true)
    public BaseResponse<List<CurrentPickUpResponse>> getChildRunningInfo(Driver driver) {
        List<Object[]> runningPickInfo = driverRepository.findRunningPickUpInfo(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(o -> CurrentPickUpResponse.of((PickUpInfo) o[0], (LocalDateTime) o[1]))
                        .toList());
    }
}