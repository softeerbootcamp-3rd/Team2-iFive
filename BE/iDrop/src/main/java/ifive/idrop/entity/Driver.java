package ifive.idrop.entity;

import ifive.idrop.dto.DriverInformation;
import ifive.idrop.dto.WorkHoursDto;
import ifive.idrop.entity.enums.Gender;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;

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
    private Double driverScore;
    private Double score;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    @OneToMany(mappedBy = "driver")
    private List<PickUpInfo> pickUpInfoList = new ArrayList<>();

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private List<WorkHours> workHoursList = new ArrayList<>();

    @OneToMany(mappedBy = "driver", cascade = CascadeType.ALL)
    private List<ReservedSchedule> reservedScheduleList = new ArrayList<>();

    public void addAdditionalInfo(DriverInformation info) {
        this.gender = (info.getGender() != null) ? Gender.of(info.getGender()) : this.gender;
        this.birth = (info.getBirth() != null) ? info.getBirth() : this.birth;
        this.image = (info.getImage() != null) ? info.getImage() : this.image;
        this.career = (info.getCareer() != null) ? info.getCareer() : this.career;
        this.introduction = (info.getIntroduction() != null) ? info.getIntroduction() : this.introduction;

        List<String> dayOfWeeks = Arrays.stream(DayOfWeek.values()).map(d -> d.getDisplayName(TextStyle.SHORT, Locale.US)).toList();

        List<WorkHoursDto> availableTime = info.getAvailableTime();
        for (WorkHoursDto workHoursDto : availableTime) {
            if (!dayOfWeeks.contains(workHoursDto.getDay())) {
                throw new RuntimeException();
            }
            workHoursList.add(workHoursDto.toEntity(this));
        }
    }
}
