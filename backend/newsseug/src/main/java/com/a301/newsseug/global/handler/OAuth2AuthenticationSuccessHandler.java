package com.a301.newsseug.global.handler;

import com.a301.newsseug.domain.auth.model.entity.CustomOAuth2User;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.external.jwt.service.JwtService;
import com.a301.newsseug.external.jwt.service.RedisTokenService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RedisTokenService redisTokenService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request, HttpServletResponse response, Authentication authentication
    ) throws IOException, ServletException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Member member = oAuth2User.getMember();

        String accessToken = jwtService.issueToken(member, TokenType.ACCESS_TOKEN);
        String refreshToken = redisTokenService.findByKey(member.getId())
                .orElseGet(() -> {
                    String token = jwtService.issueToken(member, TokenType.REFRESH_TOKEN);
                    redisTokenService.save(member.getId(), token);
                    return token;
                });

        response.setHeader("access-token", accessToken);
        response.setHeader("refresh-token", refreshToken);

    }

}
