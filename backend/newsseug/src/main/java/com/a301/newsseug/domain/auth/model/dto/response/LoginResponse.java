package com.a301.newsseug.domain.auth.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "로그인 결과")
public record LoginResponse(
        
        Boolean isFirst,
        
        String accessToken
        
) {

    public static LoginResponse of(Boolean isFirst, String accessToken) {
        return LoginResponse.builder()
                .isFirst(isFirst)
                .accessToken(accessToken)
                .build();
    }

}
