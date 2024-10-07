package com.a301.newsseug.domain.auth.model.dto.response;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "토큰 재발급 응답")
public record ReissueTokenResponse(

        @Schema(description = "어세스 토큰")
        String accessToken

) {

        public static ReissueTokenResponse of(String accessToken) {
                return ReissueTokenResponse.builder()
                        .accessToken(accessToken)
                        .build();
        }

}
