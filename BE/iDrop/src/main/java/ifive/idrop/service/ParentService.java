package ifive.idrop.service;


import ifive.idrop.dto.response.BaseResponse;
import ifive.idrop.dto.request.SubscribeRequest;
import ifive.idrop.dto.response.CurrentPickUpResponse;

import ifive.idrop.dto.response.PickUpHistoryResponse;
import ifive.idrop.dto.response.ParentSubscribeInfoResponse;
import ifive.idrop.entity.*;
import ifive.idrop.entity.enums.PickUpStatus;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.fcm.AlarmMessage;
import ifive.idrop.fcm.NotificationUtill;
import ifive.idrop.repository.DriverRepository;
import ifive.idrop.repository.ParentRepository;
import ifive.idrop.repository.PickUpRepository;
import ifive.idrop.util.Parser;
import ifive.idrop.util.ScheduleUtils;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static ifive.idrop.util.ScheduleUtils.calculateEndDate;
import static ifive.idrop.util.ScheduleUtils.calculateStartDate;

@Service
@RequiredArgsConstructor
public class ParentService {
    private final DriverRepository driverRepository;
    private final ParentRepository parentRepository;
    private final PickUpRepository pickUpRepository;

    @Transactional
    public BaseResponse<String> createSubscribe(Parent parent, SubscribeRequest subscribeRequest) throws JSONException, ExecutionException, InterruptedException {
        Driver driver = driverRepository.findById(subscribeRequest.getDriverId())
                .orElseThrow(() -> new CommonException(ErrorCode.DRIVER_NOT_EXIST));
        Child child = parentRepository.findChild(parent.getId())
                .orElseThrow(() -> new CommonException(ErrorCode.CHILD_NOT_EXIST));

        PickUpSubscribe subscribe = createPickUpSubscribe();
        PickUpLocation location = createPickUpLocation(subscribeRequest);
        createPickUpInfo(subscribeRequest, child, driver, location, subscribe);

        // 요청한 기사에게 알람
        NotificationUtill.createNotification(driver, AlarmMessage.SUBSCRIBE_REQUEST.getTitle(),
                AlarmMessage.SUBSCRIBE_REQUEST.getMessage());
        return BaseResponse.success();
    }

    @Transactional(readOnly = true)
    public BaseResponse<List<CurrentPickUpResponse>> getChildRunningInfo(Parent parent) {
        List<Object[]> runningPickInfo = parentRepository.findRunningPickUpInfo(parent.getId());
        return BaseResponse.of("Data Successfully Proceed",
                runningPickInfo.stream()
                        .map(o -> CurrentPickUpResponse.of((PickUpInfo) o[0], (LocalDateTime) o[1]))
                        .toList());
    }

    private void createPickUp(LocalDateTime localDateTime, PickUpInfo pickUpInfo) {
        PickUp pickUp = PickUp.builder()
                .reservedTime(localDateTime)
                .build();
        pickUp.updatePickUpInfo(pickUpInfo);
        pickUpRepository.savePickUp(pickUp);
    }

    // todo: 데모 이후 구독 생성시 후에 모두 승인이 아닌 대기 상태로 변경
    private PickUpSubscribe createPickUpSubscribe() {
        PickUpSubscribe subscribe = PickUpSubscribe.builder()
                .status(PickUpStatus.WAIT)
                .requestDate(LocalDateTime.now())
                .expiredDate(LocalDateTime.now().plusDays(1).plusWeeks(4))
                .build();
        pickUpRepository.savePickUpSubscribe(subscribe);
        return subscribe;
    }

    private PickUpInfo createPickUpInfo(SubscribeRequest subscribeRequest, Child child, Driver driver, PickUpLocation location, PickUpSubscribe subscribe) {
        PickUpInfo pickUpInfo = PickUpInfo.builder()
                .child(child)
                .driver(driver)
                .schedule(subscribeRequest.getSchedule().toJSONString())
                .build();
        pickUpInfo.updatePickUpSubscribe(subscribe);
        pickUpInfo.updatePickUpLocation(location);
        pickUpRepository.savePickUpInfo(pickUpInfo);
        return pickUpInfo;
    }

    private PickUpLocation createPickUpLocation(SubscribeRequest subscribeRequest) {
        PickUpLocation location = PickUpLocation.builder()
                .startAddress(subscribeRequest.getStartAddress())
                .startLatitude(subscribeRequest.getStartLatitude())
                .startLongitude(subscribeRequest.getStartLongitude())
                .endAddress(subscribeRequest.getEndAddress())
                .endLatitude(subscribeRequest.getEndLatitude())
                .endLongitude(subscribeRequest.getEndLongitude())
                .build();
        pickUpRepository.savePickUpLocation(location);
        return location;
    }

    public BaseResponse<List<PickUpHistoryResponse>> getPickUpHistoryInfo(Parent parent, long pickInfoId) {
        List<PickUp> pickUpList = pickUpRepository.findPickUpByPickUpInfoIdAndParentIdOrderByReservedTime(parent.getId(), pickInfoId);
        return BaseResponse.of("Data Successfully Proceed",
                pickUpList.stream().map(PickUpHistoryResponse::toEntity)
                        .toList());
    }

    @Transactional(readOnly = true)
    public List<ParentSubscribeInfoResponse> subscribeList(Long parentId) {
        List<PickUpInfo> pickUpInfoList = pickUpRepository.findPickUpInfoByParentIdInTheLatestOrder(parentId);
        return pickUpInfoList.stream().map(ParentSubscribeInfoResponse::of).toList();
    }
}
