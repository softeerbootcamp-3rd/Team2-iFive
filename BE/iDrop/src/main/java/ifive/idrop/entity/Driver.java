package ifive.idrop.entity;

import ifive.idrop.dto.request.DriverInformation;
import ifive.idrop.dto.response.DriverSummary;
import ifive.idrop.dto.request.WorkHoursDto;
import ifive.idrop.entity.enums.Gender;
import ifive.idrop.exception.CommonException;
import ifive.idrop.exception.ErrorCode;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static ifive.idrop.utils.ScheduleUtils.*;

@Entity
@Getter
public class Driver extends Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "driver_id")
    private Long id;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private LocalDate birth;
    private String image;
    @Lob
    private String career;
    @Lob
    private String introduction;
    private Double drivingScore;
    private Double starRate;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    @OneToMany(mappedBy = "driver")
    private List<PickUpInfo> pickUpInfoList = new ArrayList<>();

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private List<WorkHours> workHoursList = new ArrayList<>();

    public void addAdditionalInfo(DriverInformation info) {
        this.gender = (info.getGender() != null) ? Gender.of(info.getGender()) : this.gender;
        this.birth = (info.getBirth() != null) ? info.getBirth() : this.birth;
        this.image = (info.getImage() != null) ? info.getImage() : this.image;
        this.career = (info.getCareer() != null) ? info.getCareer() : this.career;
        this.introduction = (info.getIntroduction() != null) ? info.getIntroduction() : this.introduction;

        List<WorkHoursDto> availableTime = info.getAvailableTime();
        for (WorkHoursDto workHoursDto : availableTime) {
            if (!DAY_OF_WEEKS.contains(workHoursDto.getDay())) {
                throw new CommonException(ErrorCode.INVALID_DAY_OF_WEEK);
            }
            workHoursList.add(workHoursDto.toEntity(this));
        }
    }

    public DriverSummary getSummary() {
        return DriverSummary.builder()
                .driverId(this.getId())
                .name(this.getName())
                .gender(this.gender.getGender())
                .image(this.getImage())
                .introduction(this.getIntroduction())
                .starRate(this.getStarRate())
                .numberOfReviews(100) //후기 개수, 나중에 후기 테이블을 만들면 실제 개수로 수정 예정
                .build();
    }
}
