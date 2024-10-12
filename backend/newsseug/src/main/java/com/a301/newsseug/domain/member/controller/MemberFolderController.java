package com.a301.newsseug.domain.member.controller;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberFolderResponse;
import com.a301.newsseug.domain.member.service.MemberFolderService;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "멤버 API")
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberFolderController {

    private final MemberFolderService memberFolderService;

    @Operation(summary = "사용자 폴더 목록 조회", description = "사용자 폴더 목록을 조회한다.")
    @GetMapping("/folders")
    public ResponseEntity<Result<SlicedResponse<List<GetMemberFolderResponse>>>> getFolders(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(required = false, defaultValue = "0", value = "pageNumber") int pageNumber
    ) {
        return ResponseUtil.ok(
                Result.of(memberFolderService.getFoldersByMember(userDetails, pageNumber))
        );
    }

}
