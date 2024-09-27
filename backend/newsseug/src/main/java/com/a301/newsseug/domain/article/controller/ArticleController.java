package com.a301.newsseug.domain.article.controller;

import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.article.service.ArticleService;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "기사 API")
@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @Operation(summary = "오늘의 뉴스 기사 조회 API", description = "홈 화면 내 \"오늘의 뉴스\" 를 조회한다.")
    @GetMapping("/today")
    public ResponseEntity<Result<TodayArticlesResponse>> getHomeArticles() {

        TodayArticlesResponse result = articleService.getHomeArticles();

        return ResponseUtil.ok(Result.of(result));

    }

    @Operation(summary = "전체 기사 조회 API", description = "홈 화면 내 \"전체 기사\" 를 조회한다.")
    @GetMapping("/all")
    public ResponseEntity<Result<AllArticlesResponse>> getAllArticles() {

        AllArticlesResponse result = articleService.getAllArticles();

        return ResponseUtil.ok(Result.of(result));

    }

    @Operation(summary = "기사 상세 정보 조회 API", description = "기사 상세 정보를 조회한다.")
    @GetMapping("/short-form")
    public ResponseEntity<Result<GetArticleListResponse>> getArticle(
            CustomUserDetails userDetails,
            @RequestParam(value = "page", defaultValue = "0") int page) {

        GetArticleListResponse result = articleService.getArticleList(userDetails, page);

        return ResponseUtil.ok(Result.of(result));
    }

    @Operation(summary = "카테고리별 기사 조회 API", description = "카테고리별 기사 리스트를 조회한다.")
    @GetMapping()
    public ResponseEntity<Result<ListArticleResponse>> getArticlesByCategory(@RequestParam String categoryName) {

        ListArticleResponse result = articleService.getArticlesByCategory(categoryName);
        return ResponseUtil.ok(Result.of(result));

    }

}
