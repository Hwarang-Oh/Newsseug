package com.a301.newsseug.global.config;

import com.a301.newsseug.domain.auth.model.entity.CustomOAuth2UserDetails;
import com.a301.newsseug.domain.auth.service.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties.Authentication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfigurationSource corsConfigurationSource;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        return http

                .httpBasic(AbstractHttpConfigurer::disable)

                .formLogin(AbstractHttpConfigurer::disable)

                .csrf(AbstractHttpConfigurer::disable)

                .cors(cors -> cors.configurationSource(corsConfigurationSource))

                .headers(header ->
                        header.frameOptions(
                                HeadersConfigurer.FrameOptionsConfig::sameOrigin
                        ))

                .sessionManagement(sessionManagementConfigurer
                        -> sessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(requestConfigurer -> requestConfigurer

                        // 프리플라이트 관련 설정
                        .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()

                        .anyRequest().permitAll()

                )

                .oauth2Login(
                        oAuth2LoginConfigurer ->

                                oAuth2LoginConfigurer.userInfoEndpoint(
                                        userInfoEndpointConfig ->
                                                userInfoEndpointConfig
                                                        .userService(customOAuth2UserService)
                                )
                )

                .build();

    }

//    @Bean
//    public AuthenticationSuccessHandler successHandler() {
//
//        return (request, response, authentication) -> {
//
//            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//
//        }
//
//    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
