package com.a301.newsseug.domain.member.model.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "사용자 정보 등록 요청")
public record UpdateMemberRequest(

        @Schema(description = "닉네임", defaultValue = "default")
        String nickname,

        @Schema(description = "성별", defaultValue = "MALE", examples = {"MALE", "FEMALE"})
        String gender,

        @Schema(description = "생년월일", defaultValue = "19971030", examples = {"19971030"})
        String birth,

        @Schema(description = "생년월일", defaultValue = "19971030", examples = {"19971030"})
        String profileImageUrl

) {

}
