package com.a301.newsseug.domain.interaction.controller;

import com.a301.newsseug.domain.interaction.model.entity.type.ReportType;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.service.ReportService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "신고 API")
@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @Operation(summary = "기사 신고 API", description = "사용자가 특정 기사에 대해 신고를 한다.",
            responses = {
                    @ApiResponse(description = "신고 성공", responseCode = "200"),
                    @ApiResponse(description = "신고 실패", responseCode = "400")
            })
    @PostMapping("/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> reportArticle(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "articleId") Long articleId,
            @RequestParam ReportType reportType
    ) {

        reportService.reportArticle(userDetails, articleId, reportType);

        return ResponseUtil.ok(
                Result.of(
                        Boolean.TRUE
                ));

    }

}
