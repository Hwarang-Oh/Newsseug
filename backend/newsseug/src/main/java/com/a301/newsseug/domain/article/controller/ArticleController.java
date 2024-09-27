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
    @GetMapping("/simple")
    public ResponseEntity<Result<SlicedResponse<List<GetArticleResponse>>>> getTodaysArticles(
            @RequestParam(value = "category", defaultValue = "null") String category,
            @RequestParam(value = "page", defaultValue = "10") int page
    ) {

        return ResponseUtil.ok(Result.of(articleService.getTodayArticleListByCategory(category, page)));
    }

    @Operation(summary = "기사 상세 정보 조회 API", description = "기사 상세 정보를 조회한다.")
    @GetMapping("/detail")
    public ResponseEntity<Result<SlicedResponse<List<GetArticleDetailsResponse>>>> getArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(value = "page", defaultValue = "10") int page) {
        return ResponseUtil.ok(Result.of(articleService.getArticleDetailList(userDetails, page)));
    }

    @Operation(summary = "카테고리별 기사 조회 API", description = "카테고리별 기사 리스트를 조회한다.")
    @GetMapping()
    public ResponseEntity<Result<SlicedResponse<List<GetArticleResponse>>>> getArticlesByCategory(
            @RequestParam(value = "category", defaultValue = "null") String category,
            @RequestParam(value = "page", defaultValue = "10") int page
    ) {

        return ResponseUtil.ok(Result.of(articleService.getArticleListByCategory(category, page)));
    }

    @GetMapping("/press/{pressId}")
    public ResponseEntity<Result<SlicedResponse<List<GetArticleResponse>>>> getArticlesByPress(
            @PathVariable(name = "pressId") Long pressId,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber,
            @RequestParam(required = false, defaultValue = "ALL", value = "filter") String filter,
            @RequestParam(required = false, defaultValue = "TIME", value = "criteria") String criteria
    ) {
        return ResponseUtil.ok(
                Result.of(articleService.getArticlesByPress(pressId, pageNumber, filter, criteria))
        );
    }

}
