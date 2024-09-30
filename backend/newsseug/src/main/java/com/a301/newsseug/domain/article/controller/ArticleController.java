package com.a301.newsseug.domain.article.controller;

import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.article.service.ArticleService;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Tag(name = "기사 API")
@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @Operation(summary = "오늘의 뉴스 조회 API", description = "홈 화면 내 \"오늘의 뉴스\"를 조회한다.")
    @GetMapping("/today")
    public ResponseEntity<Result<SlicedResponse<List<GetArticleResponse>>>> getTodaysArticles(
            @RequestParam(required = false, defaultValue = "ALL", value = "filter") String filter,
            @RequestParam(required = false, defaultValue = "10", value = "pageNumber") int pageNumber
    ) {

        return ResponseUtil.ok(Result.of(articleService.getTodayArticleListByCategory(filter, pageNumber)));
    }

    @Operation(summary = "카테고리별 기사 조회 API", description = "카테고리별 기사 리스트를 조회한다.")
    @GetMapping()
    public ResponseEntity<Result<SlicedResponse<List<GetArticleResponse>>>> getArticlesByCategory(
            @RequestParam(required = false, defaultValue = "ALL", value = "filter") String filter,
            @RequestParam(required = false, defaultValue = "10", value = "pageNumber") int pageNumber
    ) {

        return ResponseUtil.ok(Result.of(articleService.getArticleListByCategory(filter, pageNumber)));
    }

    @Operation(summary = "단일 기사 상세 정보 조회 API", description = "단일 기사 상세 정보를 조회한다.")
    @GetMapping("/{articleId}")
    public ResponseEntity<Result<GetArticleDetailsResponse>> getArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId) {

        return ResponseUtil.ok(Result.of(articleService.getArticleDetail(userDetails, articleId)));
    }

    @GetMapping(value = {"/press", "/press/{pressId}"})
    public ResponseEntity<Result<SlicedResponse<List<GetArticleResponse>>>> getArticlesByPress(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(required = false, name = "pressId") Optional<Long> pressId,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "ALL", value = "filter") String filter,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {

        return ResponseUtil.ok(
                Result.of(articleService.getArticlesByPress(userDetails, pressId, pageNumber, filter, criteria))
        );
    }

}
