package ifive.idrop.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Builder
@Getter
public class DriverDetailResponse { //TODO 후에 차량 정보, 구체적인 리뷰 등 추가 예정
    private Long driverId;
    private String name;
    private String phoneNumber;
    private String gender;
    private LocalDate birth;
    private String image;
    private String career;
    private String introduction;
    private Double drivingScore;
    private Double starRate;
    private Integer numberOfReviews;
}
