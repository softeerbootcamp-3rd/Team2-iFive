package ifive.idrop.service;

import ifive.idrop.dto.SubscribeLocationRequest;
import ifive.idrop.dto.SubscribeRequest;
import ifive.idrop.entity.*;
import ifive.idrop.entity.enums.PickUpStatus;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.DriverRepository;
import ifive.idrop.repository.ParentRepository;
import ifive.idrop.repository.PickUpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParentService {
    private final DriverRepository driverRepository;
    private final ParentRepository parentRepository;
    private final PickUpRepository pickUpRepository;

    public void createSubscribe(Parent parent, SubscribeRequest subscribeRequest) {
        Optional<Driver> driver = driverRepository.findById(subscribeRequest.getDriverId());
        checkDriverExist(driver);
        Optional<Child> child = parentRepository.findChild(parent.getId(), subscribeRequest.getChildName());
        checkChildExist(child);

        PickUpSubscribe subscribe = createPickUpSubscribe();
        for (SubscribeLocationRequest locationData : subscribeRequest.getLocationDatas()) {
            PickUpLocation location = createPickUpLocation(locationData);
            createPickUpInfo(locationData, child, driver, location, subscribe);
            createPickUp(locationData, subscribe);
        }
    }

    private void createPickUp(SubscribeLocationRequest locationData, PickUpSubscribe subscribe) {
        PickUp pick = PickUp.builder()
                .reservedTime(locationData.getCronDate())
                .build();
        pick.updatePickUpSubscribe(subscribe);
        pickUpRepository.savePickUp(pick);
    }

    private PickUpSubscribe createPickUpSubscribe() {
        PickUpSubscribe subscribe = PickUpSubscribe.builder()
                .status(PickUpStatus.WAIT)
                .requestDate(LocalDateTime.now())
                .expiredDate(LocalDateTime.now().plusDays(7))
                .build();
        pickUpRepository.savePickUpSubscribe(subscribe);
        return subscribe;
    }

    private void createPickUpInfo(SubscribeLocationRequest locationData, Optional<Child> child, Optional<Driver> driver, PickUpLocation location, PickUpSubscribe subscribe) {
        PickUpInfo pickUpInfo = PickUpInfo.builder()
                .child(child.get())
                .driver(driver.get())
                .schedule(locationData.getCronDate())
                .pickUpLocation(location)
                .build();
        pickUpInfo.updatePickUpSubscribe(subscribe);
        pickUpRepository.savePickUpInfo(pickUpInfo);
    }

    private PickUpLocation createPickUpLocation(SubscribeLocationRequest locationData) {
        PickUpLocation location = PickUpLocation.builder()
                .startAddress(locationData.getStartLocation())
                .startLatitude(locationData.getStartLatitude())
                .startLongitude(locationData.getStartLongitude())
                .endAddress(locationData.getEndLocation())
                .endLatitude(locationData.getEndLatitude())
                .endLongitude(locationData.getEndLongitude())
                .build();
        pickUpRepository.savePickUpLocation(location);
        return location;
    }

    private void checkChildExist(Optional<Child> child) {
        if (child.isEmpty()) {
            throw new CommonException(ErrorCode.CHILD_NOT_EXIST);
        }
    }

    private void checkDriverExist(Optional<Driver> driver) {
        if (driver.isEmpty()) {
            throw new CommonException(ErrorCode.DRIVER_NOT_EXIST);
        }
    }
}
