package com.a301.newsseug.domain.press.controller;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.press.model.dto.response.GetPressDetailsResponse;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.service.PressService;
import com.a301.newsseug.global.annotation.NullableUserDetails;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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

    @Operation(summary = "모든 언론사 조회 API", description = "모든 언론사의 식별자, 이름 그리고 로고를 조회하는 API",
    responses = {
        @ApiResponse(description = "조회 성공", responseCode = "200"),
        @ApiResponse(description = "조회 실패", responseCode = "400")
    })
    @GetMapping
    public ResponseEntity<Result<List<GetPressResponse>>> getPress(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {
        return ResponseUtil.ok(Result.of(pressService.getPress(userDetails)));
    }

    @Operation(summary = "언론사 상세 조회 API", description = "단일 언론사에 대한 상제 정보를 조회하는 API",
    responses = {
        @ApiResponse(description = "조회 성공", responseCode = "200"),
        @ApiResponse(description = "조회 실패", responseCode = "400")
    })
    @GetMapping("/{pressId}")
    public ResponseEntity<Result<GetPressDetailsResponse>> getPressDetail(
            @NullableUserDetails CustomUserDetails userDetails,
            @Parameter(name = "pressId") @PathVariable("pressId") Long pressId
    ) {
        return ResponseUtil.ok(Result.of(pressService.getPressDetails(userDetails, pressId)));
	}

}
