package com.a301.newsseug.domain.interaction.controller;

import com.a301.newsseug.domain.article.service.RedisCounterService;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.service.HateService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "싫어요 API")
@RestController
@RequestMapping("/api/v1/hates")
@RequiredArgsConstructor
public class HateController {

    private final HateService hateService;
    private final RedisCounterService redisCounterService;

    @Operation(summary = "싫어요 API", description = "사용자가 기사에 싫어요를 저장한다.",
            responses = {
                    @ApiResponse(description = "싫어요 성공", responseCode = "200"),
                    @ApiResponse(description = "싫어요 실패", responseCode = "400"),
                    @ApiResponse(description = "기사 또는 사용자 조회 실패", responseCode = "404")
            })
    @PostMapping("/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> postHateToArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId
    ) {

        hateService.createHate(userDetails, articleId);
        redisCounterService.increment("article:hateCount:", articleId, 1L);

        return ResponseUtil.ok(
                Result.of(
                        Boolean.TRUE
                ));

    }

    @Operation(summary = "싫어요 취소 API", description = "사용자가 기사에 싫어요를 저장한다.",
            responses = {
                    @ApiResponse(description = "싫어요 취소 성공", responseCode = "200"),
                    @ApiResponse(description = "싫어요 취소 실패", responseCode = "400"),
                    @ApiResponse(description = "기사 또는 사용자 조회 실패", responseCode = "404")
            })
    @DeleteMapping("/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> deleteHateToArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId
    ) {

        hateService.deleteHate(userDetails, articleId);
        redisCounterService.increment("article:hateCount:", articleId, -1L);

        return ResponseUtil.ok(
                Result.of(
                        Boolean.TRUE
                ));

    }

}
