package com.a301.newsseug.domain.member.controller;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.service.MemberPressService;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.global.model.dto.Result;
import com.a301.newsseug.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "멤버 API")
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberPressController {

    private final MemberPressService memberPressService;

    @Operation(summary = "구독한 언론사 목록 조회", description = "사용자가 구독한 언론사 목록을 조회한다.")
    @GetMapping("/press")
    public ResponseEntity<Result<List<GetPressResponse>>> getPress(
            @AuthenticationPrincipal CustomUserDetails userDetails
    ) {

        return ResponseUtil.ok(
                Result.of(memberPressService.getPressByMember(userDetails))
        );

    }

    @Operation(summary = "언론사 구독", description = "사용자가 언론사를 구독한다.")
    @PostMapping("/press/{pressId}")
    public ResponseEntity<Result<Boolean>> subscribePress(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "pressId") Long pressId
    ) {
        memberPressService.subscribe(userDetails, pressId);
        return ResponseUtil.ok(
                Result.of(Boolean.TRUE)
        );

    }

    @Operation(summary = "언론사 구독 해제", description = "사용자가 언론사 구독을 해제한다.")
    @DeleteMapping("/press/{pressId}")
    public ResponseEntity<Result<Boolean>> unsubscribePress(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable(name = "pressId") Long pressId
    ) {
        memberPressService.unsubscribe(userDetails, pressId);
        return ResponseUtil.ok(
                Result.of(Boolean.TRUE)
        );

    }

}
