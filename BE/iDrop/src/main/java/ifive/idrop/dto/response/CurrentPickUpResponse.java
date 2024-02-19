package ifive.idrop.dto.response;

import ifive.idrop.entity.PickUpInfo;
import ifive.idrop.entity.PickUpLocation;
import lombok.*;

@Builder
@AllArgsConstructor
@Getter
public class CurrentPickUpResponse {
    private String childName;
    private String childImage;
    private Destination destination;

    static public CurrentPickUpResponse of(PickUpInfo pickUpInfo) {
        return CurrentPickUpResponse.builder()
                .childName(pickUpInfo.getChild().getName())
                .childImage(pickUpInfo.getChild().getImage())
                .destination(Destination.of(pickUpInfo.getPickUpLocation()))
                .build();
    }

    @Builder
    @AllArgsConstructor
    @Getter
    static class Destination {
        private Double startLatitude;
        private Double startLongitude;
        private String startAddress;
        private Double endLatitude;
        private Double endLongitude;
        private String endAddress;

        static public Destination of(PickUpLocation location) {
            return Destination.builder()
                    .startAddress(location.getStartAddress())
                    .startLatitude(location.getStartLatitude())
                    .startLongitude(location.getStartLongitude())
                    .endAddress(location.getEndAddress())
                    .endLatitude(location.getEndLatitude())
                    .endLongitude(location.getEndLongitude())
                    .build();
        }
    }
}
