package com.a301.newsseug.domain.member.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "사용자 정보 응답", description = "내정보 페이지에서 노출할 사용자의 정보.")
public record GetMemberResponse(

        @Schema(description = "닉네임")
        String nickname,

        @Schema(description = "프로필 사진 주소")
        String profileImageUrl

) {

    public static GetMemberResponse of(String nickname, String profileImageUrl) {
        return GetMemberResponse.builder()
                .nickname(nickname)
                .profileImageUrl(profileImageUrl)
                .build();
    }


}
