package ifive.idrop.websocket.direction;

import lombok.Data;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class NaverDirectionResponse {
    private int code;
    private String message;
    private LocalDateTime currentDateTime;
    private Route route;

    public List<List<Double>> getPath() {
        return route.getTraoptimal().get(0).getPath();
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

class Location {
    private List<Double> location;
}

class Goal extends Location {
    private int dir;
}

class Section {
    private int pointIndex;
    private int pointCount;
    private int distance;
    private String name;
    private int congestion;
    private int speed;
}

class Guide {
    private int pointIndex;
    private int type;
    private String instructions;
    private int distance;
    private int duration;
}