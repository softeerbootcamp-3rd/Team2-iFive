package ifive.idrop.websocket.direction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class Direction {
    List<List<Double>> path;
}
