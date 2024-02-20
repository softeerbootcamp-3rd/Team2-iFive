package ifive.idrop.service;

import ifive.idrop.dto.response.*;
import ifive.idrop.dto.request.DriverInformation;
import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.entity.*;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.DriverRepository;
import ifive.idrop.repository.PickUpRepository;
import ifive.idrop.util.RequestSchedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import ifive.idrop.dto.response.CurrentPickUpResponse;
import ifive.idrop.entity.PickUpInfo;

import java.util.List;

import static ifive.idrop.util.ScheduleUtils.*;


@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepository driverRepository;
    private final PickUpRepository pickUpRepository;

    @Transactional(readOnly = true)
    public List<Driver> searchAvailableDrivers(DriverListRequest driverListRequest) {
        RequestSchedule requestSchedule = parseToList(driverListRequest.getSchedule());

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


    @Transactional(readOnly = true)
    public BaseResponse<List<CurrentPickUpResponse>> getAllChildRunningInfo(Driver driver) {
        List<Object[]> runningPickInfo = driverRepository.findAllRunningPickInfo(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(o -> CurrentPickUpResponse.of((PickUpInfo) o[0], (LocalDateTime) o[1]))
                        .toList());
    }

    @Transactional(readOnly = true)
    public List<DriverSubscribeInfoResponse> subscribeList(Long driverId) {
        List<PickUpInfo> pickUpInfoList = pickUpRepository.findPickUpInfoByDriverId(driverId);

        List<DriverSubscribeInfoResponse> driverSubscribeInfoResponseList = new ArrayList<>();
        for (PickUpInfo pickUpInfo : pickUpInfoList) {
            Child child = pickUpInfo.getChild();
            Parent parent = child.getParent();
            PickUpSubscribe pickUpSubscribe = pickUpInfo.getPickUpSubscribe();
            PickUpLocation pickUpLocation = pickUpInfo.getPickUpLocation();

            LocalDate startDate = calculateStartDate(pickUpSubscribe.getModifiedDate());
            LocalDate endDate = calculateEndDate(pickUpSubscribe.getModifiedDate());

            DriverSubscribeInfoResponse driverSubscribeInfoResponse = DriverSubscribeInfoResponse.builder()
                    .pickupInfoId(pickUpInfo.getId())
                    .parentName(parent.getName())
                    .parentPhoneNumber(parent.getPhoneNumber())
                    .childName(child.getName())
                    .childBirth(child.getBirth())
                    .childGender(child.getGender().getGender())
                    .childImage(child.getImage())
                    .startDate(startDate)
                    .endDate(endDate)
                    .startAddress(pickUpLocation.getStartAddress())
                    .endAddress(pickUpLocation.getEndAddress())
                    .status(pickUpSubscribe.getStatus().getStatus())
                    .schedule(toJSONObject(pickUpInfo.getSchedule()))
                    .build();
            driverSubscribeInfoResponseList.add(driverSubscribeInfoResponse);
        }
        return driverSubscribeInfoResponseList;
    }

    @Transactional(readOnly = true)
    public BaseResponse<List<CurrentPickUpResponse>> getChildRunningInfo(Driver driver) {
        List<Object[]> runningPickInfo = driverRepository.findRunningPickInfo(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(o -> CurrentPickUpResponse.of((PickUpInfo) o[0], (LocalDateTime) o[1]))
                        .toList());
    }
}