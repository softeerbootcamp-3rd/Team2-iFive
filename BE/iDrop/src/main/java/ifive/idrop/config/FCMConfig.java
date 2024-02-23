package ifive.idrop.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Configuration
@Slf4j
public class FCMConfig {
    @Value("${fcm.path}")
    private String FIREBASE_CONFIG_PATH;

    @PostConstruct
    public void initialize() {
        try {
            GoogleCredentials googleCredentials = GoogleCredentials
                    .fromStream(new ClassPathResource(FIREBASE_CONFIG_PATH).getInputStream());
            log.info("FIREBASE_CONFIG_PATH_SETTING = {}", FIREBASE_CONFIG_PATH);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(googleCredentials)
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            log.error("FCM error message = {}", e.getMessage());
        }
    }
}

