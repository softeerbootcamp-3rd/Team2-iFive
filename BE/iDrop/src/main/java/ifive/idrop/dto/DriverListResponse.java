package ifive.idrop.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class DriverListResponse {
    //이름, 사진, 자기소개, score, (성별), (후기 개수)
    private final List<DriverSummary> drivers = new ArrayList<>();
}
