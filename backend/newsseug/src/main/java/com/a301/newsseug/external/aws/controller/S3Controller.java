package com.a301.newsseug.external.aws.controller;

import com.a301.newsseug.external.aws.model.dto.response.GetPreSignedURLResponse;
import com.a301.newsseug.external.aws.service.S3Service;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "S3 API")
@RestController
@RequestMapping("/api/v1/s3")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    @Operation(summary = "S3 Pre-Signed URL 발급", description = "S3 업로드를 위한 Pre-Signed URL 발급")
    @Parameters({
            @Parameter(name = "fileType", example = "profile"),
            @Parameter(name = "entity", example = "member"),
            @Parameter(name = "id", example = "1"),
            @Parameter(name = "fileName", example = "profile.svg")

    })
    @GetMapping("/upload")
    public ResponseEntity<Result<GetPreSignedURLResponse>> generateUploadUrl(
            @RequestParam(name = "fileType", defaultValue = "profile") String fileType,
            @RequestParam(name = "entity", defaultValue = "member") String entity,
            @RequestParam(name = "id") Long id,
            @RequestParam(name = "fileName") String fileName
    ) {
        return ResponseUtil.ok(
                Result.of(s3Service.generateUploadPreSignedUrl(fileType, entity, id, fileName))
        );
    }

}

