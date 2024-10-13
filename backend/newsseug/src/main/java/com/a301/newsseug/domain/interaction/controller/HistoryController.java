package com.a301.newsseug.domain.interaction.controller;

import java.util.List;

import java.util.Set;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.HistoryDto;
import com.a301.newsseug.domain.interaction.service.HistoryService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.util.ResponseUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "시청기록 API")
@RestController
@RequestMapping("/api/v1/histories")
@RequiredArgsConstructor
public class HistoryController {

	private final HistoryService historyService;

	@GetMapping
	@Operation(summary = "사용자 시청 기록", description = "사용자가 시청한 숏폼 목록을 반환하는 API")
	public ResponseEntity<Result<SlicedResponse<Set<HistoryDto>>>> getMemberHistories(
			@AuthenticationPrincipal CustomUserDetails userDetails,
			@RequestParam(name = "page", defaultValue = "0") int page
	) {
		return ResponseUtil.ok(Result.of(historyService.getHistories(userDetails, page)));
	}

}
