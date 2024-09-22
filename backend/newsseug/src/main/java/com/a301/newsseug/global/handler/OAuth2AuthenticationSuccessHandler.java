package com.a301.newsseug.global.handler;

import com.a301.newsseug.domain.auth.model.entity.CustomOAuth2User;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.config.JwtProperties;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.external.jwt.service.JwtService;
import com.a301.newsseug.external.jwt.service.RedisTokenService;
import com.a301.newsseug.global.util.CookieUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final JwtProperties jwtProperties;
    private final RedisTokenService redisTokenService;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request, HttpServletResponse response, Authentication authentication
    ) throws IOException, ServletException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
        Member member = oAuth2User.getMember();

        String accessToken = jwtService.issueToken(member, TokenType.ACCESS_TOKEN);
        redisTokenService.findByKey(member.getId())
                .orElseGet(() -> {
                    String token = jwtService.issueToken(member, TokenType.REFRESH_TOKEN);
                    redisTokenService.save(member.getId(), token);
                    return token;
                });

        response.addCookie(
                CookieUtil.create("access-token", accessToken, jwtProperties.getExpiration().getAccess())
        );

        if (oAuth2User.isFirst()) {
            response.sendRedirect("http://localhost:3000/register");
            return;
        }

        response.sendRedirect("http://localhost:3000");

    }

}
