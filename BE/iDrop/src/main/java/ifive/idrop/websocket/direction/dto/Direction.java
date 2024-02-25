package ifive.idrop.websocket.direction.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@AllArgsConstructor
public class Direction {
    List<List<Double>> path;

    public void pushStartPath(List<Double> startLocation) {
        this.path.add(0, startLocation);
    }
}
