package com.a301.newsseug.domain.article.controller;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.service.ArticlePressService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "기사 API")
@RestController
@RequestMapping("/api/v1/articles")
@RequiredArgsConstructor
public class ArticlePressController {

    private final ArticlePressService articleService;

    @GetMapping("press/{pressId}")
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
