package com.a301.newsseug.global.handler;

import com.a301.newsseug.domain.auth.model.entity.CustomOAuth2User;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${app.client.base-url}")
    private String url;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request, HttpServletResponse response, Authentication authentication
    ) throws IOException, ServletException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String redirectUrl = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("isFirst", oAuth2User.getMember().getIsFirst())
                .queryParam("providerId", oAuth2User.getMember().getOAuth2Details().getProviderId())
                .build().toUriString();

        response.sendRedirect(redirectUrl);

    }

}
