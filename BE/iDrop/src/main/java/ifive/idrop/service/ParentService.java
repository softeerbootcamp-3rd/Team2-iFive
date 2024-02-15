package ifive.idrop.service;

import ifive.idrop.dto.BaseResponse;
import ifive.idrop.dto.SubscribeRequest;
import ifive.idrop.entity.*;
import ifive.idrop.entity.enums.PickUpStatus;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.DriverRepository;
import ifive.idrop.repository.ParentRepository;
import ifive.idrop.repository.PickUpRepository;
import ifive.idrop.util.Parser;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParentService {
    private final DriverRepository driverRepository;
    private final ParentRepository parentRepository;
    private final PickUpRepository pickUpRepository;

    @Transactional
    public BaseResponse<String> createSubscribe(Parent parent, SubscribeRequest subscribeRequest) throws JSONException {
        Driver driver = driverRepository.findById(subscribeRequest.getDriverId())
                .orElseThrow(() -> new CommonException(ErrorCode.DRIVER_NOT_EXIST));
        Child child = parentRepository.findChild(parent.getId(), subscribeRequest.getChildName())
                .orElseThrow(() -> new CommonException(ErrorCode.CHILD_NOT_EXIST));

        PickUpSubscribe subscribe = createPickUpSubscribe();
        PickUpLocation location = createPickUpLocation(subscribeRequest);
        PickUpInfo pickUpInfo = createPickUpInfo(subscribeRequest, child, driver, location, subscribe);

        // JsonDate를 LocalDate로 파싱
        List<LocalDateTime> scheduleList = Parser.parseSchedule(subscribeRequest.getRequestDate(), subscribe.getExpiredDate());

        for (LocalDateTime localDateTime : scheduleList) {
            createPickUp(localDateTime, pickUpInfo);
        }

        return BaseResponse.success();
    }

    private void createPickUp(LocalDateTime localDateTime, PickUpInfo pickUpInfo) {
        PickUp pickUp = PickUp.builder()
                .reservedTime(localDateTime)
                .build();
        pickUp.updatePickUpInfo(pickUpInfo);
        pickUpRepository.savePickUp(pickUp);
    }

    private PickUpSubscribe createPickUpSubscribe() {
        PickUpSubscribe subscribe = PickUpSubscribe.builder()
                .status(PickUpStatus.ACCEPT)
                .requestDate(LocalDateTime.now().plusDays(1))
                .expiredDate(LocalDateTime.now().plusDays(1).plusWeeks(4))
                .build();
        pickUpRepository.savePickUpSubscribe(subscribe);
        return subscribe;
    }

    private PickUpInfo createPickUpInfo(SubscribeRequest subscribeRequest, Child child, Driver driver, PickUpLocation location, PickUpSubscribe subscribe) {
        PickUpInfo pickUpInfo = PickUpInfo.builder()
                .child(child)
                .driver(driver)
                .schedule(subscribeRequest.getRequestDate())
                .pickUpLocation(location)
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
}
