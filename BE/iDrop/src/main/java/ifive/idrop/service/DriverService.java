package ifive.idrop.service;

import ifive.idrop.annotation.Login;
import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.dto.request.DriverInformation;
import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.dto.response.DriverDetailResponse;
import ifive.idrop.entity.Driver;
import ifive.idrop.entity.PickUp;
import ifive.idrop.entity.WorkHours;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.DriverRepository;
import ifive.idrop.repository.PickUpRepository;
import ifive.idrop.util.RequestSchedule;
import ifive.idrop.util.ScheduleUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ifive.idrop.dto.response.CurrentPickUpResponse;
import ifive.idrop.entity.PickUpInfo;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;



@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepository driverRepository;
    private final PickUpRepository pickUpRepository;

    @Transactional(readOnly = true)
    public List<Driver> searchAvailableDrivers(DriverListRequest driverListRequest) {
        RequestSchedule requestSchedule = ScheduleUtils.parseToList(driverListRequest.getSchedule());

        List<Driver> availableDrivers = new ArrayList<>();
        List<Driver> drivers = driverRepository.findAllDrivers();
        for (Driver driver : drivers) {
            List<PickUp> pickUpList = pickUpRepository.findReservedPickUpsByDriver(driver.getId());
            List<LocalDateTime> reservedSchedule = pickUpList.stream()
                    .map(PickUp::getReservedTime)
                    .toList();
            List<WorkHours> workHoursList = driver.getWorkHoursList();
            if (requestSchedule.isAvailable(workHoursList, reservedSchedule)) {
                availableDrivers.add(driver);
            }
        }
        return availableDrivers;
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

    public BaseResponse<List<CurrentPickUpResponse>> getChildRunningInfo(Driver driver) {
        List<PickUpInfo> runningPickInfo = driverRepository.findRunningPickInfo(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(CurrentPickUpResponse::of)
                        .toList());
    }

    @Transactional(readOnly = true)
    public void subscribeList(Long driverId) {
    }

}