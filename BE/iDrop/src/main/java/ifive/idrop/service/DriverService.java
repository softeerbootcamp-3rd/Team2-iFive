package ifive.idrop.service;

import ifive.idrop.dto.request.SubscribeCheckRequest;
import ifive.idrop.dto.response.*;
import ifive.idrop.dto.request.DriverInformation;
import ifive.idrop.dto.request.DriverListRequest;
import ifive.idrop.entity.*;
import ifive.idrop.entity.enums.PickUpStatus;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.fcm.AlarmMessage;
import ifive.idrop.fcm.NotificationUtill;
import ifive.idrop.repository.DriverRepository;
import ifive.idrop.repository.NotificationRepository;
import ifive.idrop.repository.PickUpRepository;
import ifive.idrop.util.RequestSchedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import ifive.idrop.dto.response.CurrentPickUpResponse;
import ifive.idrop.entity.PickUpInfo;

import java.util.List;
import java.util.Objects;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;


import static ifive.idrop.util.ScheduleUtils.*;


@RequiredArgsConstructor
@Service
public class DriverService {
    private final DriverRepository driverRepository;
    private final PickUpRepository pickUpRepository;
    private final NotificationRepository notificationRepository;

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
        List<Object[]> runningPickInfo = driverRepository.findAllRunningPickUpInfoOrderByreservedTimeASC(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(o -> CurrentPickUpResponse.of((PickUpInfo) o[0], (LocalDateTime) o[1]))
                        .toList());
    }

    @Transactional(readOnly = true)
    public List<DriverSubscribeInfoResponse> subscribeList(Long driverId) {
        List<PickUpInfo> pickUpInfoList = pickUpRepository.findPickUpInfoByDriverIdTheLatestOrder(driverId);
        return pickUpInfoList.stream().map(DriverSubscribeInfoResponse::of).toList();
    }

    @Transactional(readOnly = true)
    public BaseResponse<List<CurrentPickUpResponse>> getChildRunningInfo(Driver driver) {
        List<Object[]> runningPickInfo = driverRepository.findRunningPickUpInfo(driver.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(o -> CurrentPickUpResponse.of((PickUpInfo) o[0], (LocalDateTime) o[1]))
                        .toList());
    }

    @Transactional
    public BaseResponse subscribeCheck(Long driverId, SubscribeCheckRequest subscribeCheckRequest) throws ExecutionException, InterruptedException {
        Integer statusCode = subscribeCheckRequest.getStatusCode();
        if (statusCode == null || !(statusCode == 0 || statusCode == 1)) {
            throw new CommonException(ErrorCode.INVALID_PICKUP_STATUS);
        }
        Long pickUpInfoId = subscribeCheckRequest.getPickUpInfoId();
        PickUpInfo pickUpInfo = pickUpRepository.findPickUpInfoById(pickUpInfoId)
                .orElseThrow(() -> new CommonException(ErrorCode.PICKUP_INFO_NOT_EXIST));

        if (!Objects.equals(driverId, pickUpInfo.getDriver().getId())) {
            throw new CommonException(ErrorCode.UNAUTHORIZED_USER);
        }

        PickUpSubscribe pickUpSubscribe = pickUpInfo.getPickUpSubscribe();
        PickUpStatus pickUpStatus = pickUpSubscribe.modify(PickUpStatus.of(statusCode));

        if (pickUpStatus.equals(PickUpStatus.ACCEPT)) {
            RequestSchedule requestSchedule = parseToList(toJSONObject(pickUpInfo.getSchedule()));
            List<LocalDateTime> requestScheduleList = requestSchedule.getRequestSchedule();
            for (LocalDateTime reservedTime : requestScheduleList) {
                createPickUp(reservedTime, pickUpInfo);
            }
            removeOverlappedSubscribe(driverId, pickUpInfo); //승인한 구독 요청과 시간이 겹치는 다른 구독 요청을 거절로 처리함

            // 알림 보내기
            Parent parent = pickUpInfo.getChild().getParent();
            NotificationUtill.createNotification(parent,
                    AlarmMessage.APPROVE.getTitle(), AlarmMessage.APPROVE.getMessage());

            return BaseResponse.from("요청을 성공적으로 승인했습니다.");
        } else {
            Parent parent = pickUpInfo.getChild().getParent();
            NotificationUtill.createNotification(parent,
                    AlarmMessage.DECLINE.getTitle(), AlarmMessage.DECLINE.getMessage());

            return BaseResponse.from("요청을 성공적으로 거절했습니다.");
        }
        //TODO Alarm to Parent
    }

    @Transactional(readOnly = true)
    public List<DriverTodayRemainingPickUpResponse> getTodayRemainingPickUpList(Long driverId) {
        List<Object[]> remainingPickUpInfo = driverRepository.findRemainingPickUpInfo(driverId);

        return remainingPickUpInfo.stream()
                .map(o -> {
                    PickUpInfo po = (PickUpInfo) o[0];
                    LocalDateTime reservedTime = (LocalDateTime) o[1];
                    return DriverTodayRemainingPickUpResponse.of(po, reservedTime);
                })
                .collect(Collectors.toList());
    }


    private void createPickUp(LocalDateTime localDateTime, PickUpInfo pickUpInfo) {
        PickUp pickUp = PickUp.builder()
                .reservedTime(localDateTime)
                .build();
        pickUp.updatePickUpInfo(pickUpInfo);
        pickUpRepository.savePickUp(pickUp);

        // Notifiaciton 생성
        Notification notification = Notification.builder()
                .driver(pickUpInfo.getDriver())
                .pickUpAlarmTime(localDateTime.minusHours(1))
                .build();
        notificationRepository.save(notification);
    }

    private void removeOverlappedSubscribe(Long driverId, PickUpInfo pickUpInfo) {
        List<PickUpInfo> waitingPickUpInfoList = pickUpRepository.findWaitingPickUpInfoByDriverId(driverId);
        for (PickUpInfo waitingPickUpInfo : waitingPickUpInfoList) {
            if (isOverlapped(pickUpInfo.getSchedule(), waitingPickUpInfo.getSchedule())) {
                waitingPickUpInfo.getPickUpSubscribe().modify(PickUpStatus.DECLINE);

                // 거절 알람
                Parent parent = pickUpInfo.getParent();
                NotificationUtill.createNotification(parent, AlarmMessage.DECLINE.getTitle(),
                        AlarmMessage.DECLINE.getMessage());
            }
        }
    }
}