package com.a301.newsseug.domain.interaction.controller;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.service.InteractionService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "사용자 상호작용 API")
@RestController
@RequestMapping("/api/v1/interactions")
@RequiredArgsConstructor
public class InteractionController {

    private final InteractionService interactionService;

    @Operation(summary = "좋아요 API", description = "사용자가 기사에 좋아요를 저장한다.",
            responses = {
                    @ApiResponse(description = "좋아요 성공", responseCode = "200"),
                    @ApiResponse(description = "좋아요 실패", responseCode = "400"),
                    @ApiResponse(description = "기사 조회 실패", responseCode = "404")
            })
    @PostMapping("/likes/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> postLikeToArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId
    ) {

        return ResponseUtil.ok(
                Result.of(
                        interactionService.postLikeToArticle(userDetails, articleId)
                ));

    }

    @Operation(summary = "좋아요 취소 API", description = "사용자가 기사에 좋아요를 삭제한다.",
            responses = {
                    @ApiResponse(description = "좋아요 취소 성공", responseCode = "200"),
                    @ApiResponse(description = "좋아요 취소 실패", responseCode = "400"),
                    @ApiResponse(description = "기사 또는 사용자 조회 실패", responseCode = "404")
            })
    @DeleteMapping("/likes/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> deleteLikeToArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId
    ) {

        return ResponseUtil.ok(
                Result.of(
                        interactionService.deleteLikeFromArticle(userDetails, articleId)
                ));

    }

    @Operation(summary = "싫어요 API", description = "사용자가 기사에 싫어요를 저장한다.",
            responses = {
                    @ApiResponse(description = "싫어요 성공", responseCode = "200"),
                    @ApiResponse(description = "싫어요 실패", responseCode = "400"),
                    @ApiResponse(description = "기사 또는 사용자 조회 실패", responseCode = "404")
            })
    @PostMapping("/hates/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> postHateToArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId
    ) {

        return ResponseUtil.ok(
                Result.of(
                        interactionService.PostHateToArticle(userDetails, articleId)
                ));

    }

}
