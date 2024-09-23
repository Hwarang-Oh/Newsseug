package com.a301.newsseug.domain.bookmark.controller;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.service.BookmarkService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "폴더 API")
@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @Operation(summary = "기사 저장하기", description = "사용자가 기사를 폴더에 저장한다.")
    @PostMapping("/{folderId}/articles/{articleId}")
    public ResponseEntity<Result<Boolean>> createBookmark(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "folderId") Long folderId,
            @PathVariable(name = "articleId") Long articleId
    ) {
        bookmarkService.createBookmark(userDetails, folderId, articleId);
        return ResponseUtil.created(Result.of(Boolean.TRUE));
    }


}
