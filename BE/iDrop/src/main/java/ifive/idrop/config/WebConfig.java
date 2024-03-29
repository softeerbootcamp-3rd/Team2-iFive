package ifive.idrop.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import ifive.idrop.filter.*;
import ifive.idrop.jwt.JwtProvider;
import ifive.idrop.repository.UserRepository;
import ifive.idrop.resolver.LoginUsersArgumentResolver;
import ifive.idrop.service.UserService;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final JwtProvider provider;
    private final ObjectMapper mapper;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new LoginUsersArgumentResolver(provider, mapper, userRepository));
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        FilterRegistrationBean<CorsFilter> registrationBean = new FilterRegistrationBean<>(new CorsFilter());
        registrationBean.setUrlPatterns(List.of("*"));
        registrationBean.setOrder(0);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> verifyUserFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new VerifyUserFilter(mapper, userService));
        filterRegistrationBean.setOrder(1);
        filterRegistrationBean.addUrlPatterns("/user/login");
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> jwtFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter(provider, mapper, userService));
        filterRegistrationBean.setOrder(2);
        filterRegistrationBean.addUrlPatterns("/user/login");
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> jwtAuthorizationFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtAuthorizationFilter(provider, mapper));
        filterRegistrationBean.setOrder(2);
        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<Filter> fcmTokenFilter() {
        FilterRegistrationBean<Filter> filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new FCMFilter(mapper, userService));
        filterRegistrationBean.setOrder(3);
        return filterRegistrationBean;
    }
}
