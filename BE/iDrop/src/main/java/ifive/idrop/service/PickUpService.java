package ifive.idrop.service;

import ifive.idrop.entity.PickUp;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import ifive.idrop.repository.PickUpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PickUpService {

    private final ImageService imageService;
    private final PickUpRepository pickUpRepository;

    @Transactional
    public void saveStartOrEndPickUp(Long pickUpId, MultipartFile image, String message) throws IOException {
        PickUp pickUp = pickUpRepository.findById(pickUpId)
                .orElseThrow(() -> new CommonException(ErrorCode.PICKUP_NOT_FOUND));
        if (pickUp.getStartImage() == null) {
            String imageUrl = imageService.upload(image, "image/pickup/");
            pickUpRepository.savePickUpStartInfo(pickUpId, imageUrl, message);
        } else if (pickUp.getEndImage() == null) {
            String imageUrl = imageService.upload(image, "image/pickup/");
            pickUpRepository.savePickUpEndInfo(pickUpId, imageUrl, message);
        } else {
            throw new CommonException(ErrorCode.PICKUP_ALREADY_END);
        }
    }

    public PickUp findByPickUpId(Long pickUpId) {
        return pickUpRepository.findById(pickUpId)
                .orElseThrow(() -> new CommonException(ErrorCode.PICKUP_NOT_FOUND));
    }

    public Optional<PickUp> findCurrentPickUp(Long driverId, Long childId) {
        List<PickUp> pickUps = pickUpRepository.findPickUpsByDriverIdWithCurrentTimeInReservedWindow(driverId);
        Optional<PickUp> result = pickUps.stream()
                .filter(p -> p.getChild().getId().equals(childId))
                .findFirst();
        return result;
    }

}
