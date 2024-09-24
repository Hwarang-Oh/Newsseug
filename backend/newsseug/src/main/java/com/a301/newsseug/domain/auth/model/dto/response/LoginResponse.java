package com.a301.newsseug.domain.auth.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "로그인 결과", description = "로그인 요청에 대한 정보.")
public record LoginResponse(
        
        @Schema(description = "어세스 토큰")
        String accessToken
        
) {

    public static LoginResponse of(String accessToken) {
        return LoginResponse.builder()
                .accessToken(accessToken)
                .build();
    }

}
