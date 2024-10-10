package com.a301.newsseug.domain.interaction.controller;

import com.a301.newsseug.domain.article.service.RedisCounterService;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.service.LikeService;
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

@Tag(name = "좋아요 API")
@RestController
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final RedisCounterService redisCounterService;

    @Operation(summary = "좋아요 API", description = "사용자가 기사에 좋아요를 저장한다.",
            responses = {
                    @ApiResponse(description = "좋아요 성공", responseCode = "200"),
                    @ApiResponse(description = "좋아요 실패", responseCode = "400"),
                    @ApiResponse(description = "기사 조회 실패", responseCode = "404")
            })
    @PostMapping("/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> postLikeToArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId
    ) {

        likeService.createLike(userDetails, articleId);

        return ResponseUtil.ok(
                Result.of(
                        Boolean.TRUE
                ));

    }

    @Operation(summary = "좋아요 취소 API", description = "사용자가 기사에 좋아요를 삭제한다.",
            responses = {
                    @ApiResponse(description = "좋아요 취소 성공", responseCode = "200"),
                    @ApiResponse(description = "좋아요 취소 실패", responseCode = "400"),
                    @ApiResponse(description = "기사 또는 사용자 조회 실패", responseCode = "404")
            })
    @DeleteMapping("/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> deleteLikeToArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId
    ) {

        likeService.deleteLike(userDetails, articleId);
        redisCounterService.increment("article:likeCount:", articleId, -1L);

        return ResponseUtil.ok(
                Result.of(
                        Boolean.TRUE
                ));

    }

}
