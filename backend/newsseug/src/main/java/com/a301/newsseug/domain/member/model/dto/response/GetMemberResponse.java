package com.a301.newsseug.domain.member.model.dto.response;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.type.GenderType;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "사용자 정보 응답", description = "내정보 페이지에서 노출할 사용자의 정보.")
public record GetMemberResponse(

        @Schema(description = "닉네임")
        String nickname,

        @Schema(description = "프로필 사진 주소")
        String profileImageUrl,

        @Schema(description = "성별")
        GenderType gender,

        @Schema(description = "생년월일")
        LocalDate birth

) {

    public static GetMemberResponse of(Member member) {
        return GetMemberResponse.builder()
                .nickname(member.getNickname())
                .profileImageUrl(member.getProfileImageUrl())
                .gender(member.getGender())
                .birth(member.getBirth())
                .build();
    }


}
