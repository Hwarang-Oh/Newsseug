package com.a301.newsseug.domain.press.controller;

import java.util.Optional;

import com.a301.newsseug.domain.press.model.dto.GetPressBrandingResponseDto;
import com.a301.newsseug.domain.press.model.dto.GetPressResponseDto;
import com.a301.newsseug.domain.press.service.PressService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @Operation(summary = "모든 언론사 조회 API", description = "모든 언론사의 정보를 조회하는 API",
    responses = {
        @ApiResponse(description = "조회 성공", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = GetPressBrandingResponseDto.class))),
        @ApiResponse(description = "조회 실패", responseCode = "400")
    })
    public ResponseEntity<Result<GetPressBrandingResponseDto>> getPressBranding() {
        return ResponseUtil.ok(Result.of(pressService.getPressBranding()));
    }

    @GetMapping("/{pressId}")
    @Operation(summary = "언론사 상세조회 API", description = "한 언론사에 대한 정보를 조회하는 API",
    responses = {
        @ApiResponse(description = "조회 성공", responseCode = "200", content = @Content(mediaType = "application/json", schema = @Schema(implementation = GetPressResponseDto.class))),
        @ApiResponse(description = "조회 실패", responseCode = "400")
    })
    public ResponseEntity<Result<GetPressResponseDto>> getPress(@Parameter(name = "언론사 식별자") @PathVariable("pressId") Long pressId) {
        Optional<GetPressResponseDto> responseDto = pressService.getPress(pressId);

		return responseDto.map(getPressResponseDto -> ResponseUtil.ok(Result.of(getPressResponseDto)))
			.orElseGet(() -> ResponseUtil.noContent(Result.empty()));

	}
}
