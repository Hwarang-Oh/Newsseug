package com.a301.newsseug.domain.press.controller;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;
import com.a301.newsseug.domain.press.service.PressService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/press")
@RequiredArgsConstructor
@Tag(name = "언론사 API", description = "언론사 API입니다.")
public class PressController {

    private final PressService pressService;

    @GetMapping
    @Operation(summary = "모든 언론사 단순 정보 조회 API", description = "모든 언론사의 식별자, 이름 그리고 로고를 조회하는 API",
    responses = {
        @ApiResponse(description = "조회 성공", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ListSimplePressResponse.class))),
        @ApiResponse(description = "조회 실패", responseCode = "400")
    })
    public ResponseEntity<Result<ListSimplePressResponse>> getSimplePress(@AuthenticationPrincipal CustomUserDetails userDetails) {
        return ResponseUtil.ok(Result.of(pressService.getSimplePress(userDetails)));
    }

    @GetMapping("/{pressId}")
    @Operation(summary = "언론사 상세조회 API", description = "한 언론사에 대한 정보를 조회하는 API",
    responses = {
        @ApiResponse(description = "조회 성공", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = GetPressResponse.class))),
        @ApiResponse(description = "조회 실패", responseCode = "400")
    })
    public ResponseEntity<Result<GetPressResponse>> getPress(@Parameter(name = "언론사 식별자") @PathVariable("pressId") Long pressId) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && !(authentication instanceof AnonymousAuthenticationToken) && authentication.isAuthenticated()) {
            CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            return ResponseUtil.ok(Result.of(pressService.getPress(pressId, userDetails)));
        }

        return ResponseUtil.ok(Result.of(pressService.getPress(pressId)));
	}
}
