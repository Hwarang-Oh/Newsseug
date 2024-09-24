package com.a301.newsseug.domain.auth.controller;

import com.a301.newsseug.domain.auth.model.dto.response.LoginResponse;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.external.jwt.service.JwtService;
import com.a301.newsseug.external.jwt.service.RedisTokenService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "인증/인가 API")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtService jwtService;
    private final RedisTokenService redisTokenService;

    @Operation(summary = "로그인 API", description = "로그인을 수행한다.")
    @GetMapping("/login")
    public ResponseEntity<Result<LoginResponse>> login(
            @RequestParam("providerId") String providerId
    ) {

        String accessToken = jwtService.issueToken(providerId, TokenType.ACCESS_TOKEN);
        redisTokenService.findByKey(providerId)
                .orElseGet(() -> {
                    String token = jwtService.issueToken(providerId, TokenType.REFRESH_TOKEN);
                    redisTokenService.save(providerId, token);
                    return token;
                });

        return ResponseUtil.ok(Result.of(LoginResponse.of(accessToken)));

    }

}
