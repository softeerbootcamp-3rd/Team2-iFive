package ifive.idrop.websocket.direction.dto;

import lombok.Data;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Data
public class NaverDirectionResponse {
    private int code;
    private String message;
    private LocalDateTime currentDateTime;
    private Route route;

    public Optional<List<List<Double>>> getPath() {
        List<List<Double>> path = null;
        try {
            path = route.getTraoptimal().get(0).getPath();
        } catch (NullPointerException e) {
            log.error("경로가 존재하지 않습니다.");
        }
        return Optional.ofNullable(path);
    }
}

@Getter
class Route {
    private List<TraOptimal> traoptimal;
}

@Getter
class TraOptimal {
    private Summary summary;
    private List<List<Double>> path;
    private List<Section> section;
    private List<Guide> guide;
}

@Getter
class Summary {
    private Location start;
    private Goal goal;
    private int distance;
    private int duration;
    private int etaServiceType;
    private String departureTime;
    private List<List<Double>> bbox;
    private int tollFare;
    private int taxiFare;
    private int fuelPrice;
}

@Getter
class Location {
    private List<Double> location;
}

@Getter
class Goal extends Location {
    private int dir;
}

@Getter
class Section {
    private int pointIndex;
    private int pointCount;
    private int distance;
    private String name;
    private int congestion;
    private int speed;
}

@Getter
class Guide {
    private int pointIndex;
    private int type;
    private String instructions;
    private int distance;
    private int duration;
}