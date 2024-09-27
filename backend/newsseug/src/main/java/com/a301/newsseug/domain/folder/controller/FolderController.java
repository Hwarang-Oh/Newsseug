package com.a301.newsseug.domain.folder.controller;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.ListFolderResponse;
import com.a301.newsseug.domain.folder.service.FolderService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "폴더 API")
@RestController
@RequestMapping("/api/v1/folders")
@RequiredArgsConstructor
public class FolderController {

    private final FolderService folderService;

    @Operation(summary = "폴더 조회", description = "폴더에 스크랩한 기사 목록을 조회한다.")
    @GetMapping("/{folderId}")
    public ResponseEntity<Result<GetFolderResponse>> getFolder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "folderId") @NotBlank Long folderId
    ) {

        return ResponseEntity.ok(
                Result.of(folderService.getFolder(userDetails, folderId))
        );

    }

    @Operation(summary = "폴더 목록 조회", description = "사용자가 생성한 폴더 목록을 조회한다.")
    @GetMapping
    public ResponseEntity<Result<ListFolderResponse>> getFolders(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        return ResponseEntity.ok(
                Result.of(folderService.getFoldersByMember(userDetails))
        );

    }

    @Operation(summary = "폴더 생성", description = "사용자가 폴더를 생성한다.")
    @PostMapping
    public ResponseEntity<Result<Boolean>> createFolder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(name = "title") @NotBlank String title
    ) {
        folderService.createFolder(userDetails, title);
        return ResponseUtil.created(Result.of(Boolean.TRUE));
    }


}
