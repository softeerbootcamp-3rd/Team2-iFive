package ifive.idrop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class IDropApplication {

    public static void main(String[] args) {
        SpringApplication.run(IDropApplication.class, args);
    }

}
