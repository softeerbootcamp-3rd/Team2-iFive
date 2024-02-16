package ifive.idrop.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class CustomObjectMapper {
    private static final ObjectMapper mapper;

    static {
        mapper  = new ObjectMapper();
        //LocalDateTime 타입도 매핑하기 위해 mapper 세팅
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        mapper.registerModule(javaTimeModule);
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    }

    public static ObjectMapper getMapper() {
        return mapper;
    }

    public static <T> T getObject(final String jsonMessage, Class<T> clazz) throws Exception {
        return mapper.readValue(jsonMessage, clazz);
    }


    public static <T> String getString(final T object) throws Exception {
        return mapper.writeValueAsString(object);
    }

}
