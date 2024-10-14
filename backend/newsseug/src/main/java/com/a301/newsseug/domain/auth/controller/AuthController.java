package com.a301.newsseug.domain.auth.controller;

import com.a301.newsseug.domain.auth.model.dto.response.ReissueTokenResponse;
import com.a301.newsseug.domain.auth.model.dto.response.LoginResponse;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.auth.service.AuthService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "인증/인가 API")
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "로그인 API", description = "로그인을 수행한다.")
    @GetMapping("/login")
    public ResponseEntity<Result<LoginResponse>> login(
            @RequestParam("providerId") @NotBlank String providerId
    ) {
        return ResponseUtil.ok(
                Result.of(authService.login(providerId))
        );
    }

    @Operation(summary = "로그아웃 API", description = "로그아웃을 수행한다.")
    @GetMapping("/logout")
    public ResponseEntity<Result<Boolean>> logout(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam("providerId") String providerId
    ) {
        return ResponseUtil.ok(
                Result.of(authService.logout(userDetails, providerId))
        );
    }

    @Operation(summary = "어세스 토큰 재발급 API", description = "어세스 토큰을 재발급한다.")
    @GetMapping("/reissue")
    public ResponseEntity<Result<ReissueTokenResponse>> issueAccessToken(
            @RequestHeader("refresh-token") String refreshToken,
            @RequestParam("providerId") String providerId
    ) {
        return ResponseUtil.ok(
                Result.of(authService.reissueToken(refreshToken, providerId))
        );
    }

}
