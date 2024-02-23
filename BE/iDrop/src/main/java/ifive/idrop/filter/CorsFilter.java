package ifive.idrop.filter;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@Configuration
@Slf4j
public class CorsFilter implements Filter {

    final static List<String> requestOrigin = List.of("http://localhost:5173", "https://idrop-44945.web.app");
    final static String wsOrigin = "/ws";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String origin = request.getHeader("Origin");
        if (origin == null) {
            origin = request.getHeader("Sec-WebSocket-Origin");
        }

        log.info("request origin = {}", origin);
//        if (requestOrigin.contains(origin)) {
//            response.setHeader("Access-Control-Allow-Origin", origin);
//        }
        response.setHeader("Access-Control-Allow-Origin", "*");

        response.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "*");
        chain.doFilter(servletRequest, response);
    }
}