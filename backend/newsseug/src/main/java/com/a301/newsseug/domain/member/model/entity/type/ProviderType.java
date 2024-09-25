package com.a301.newsseug.domain.member.model.entity.type;

import com.a301.newsseug.domain.member.exception.InvalidProviderTypeException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "OAuth 로그인 제공자")
public enum ProviderType {

    @Schema(description = "카카오")
    KAKAO("kakao"),

    @Schema(description = "구글")
    GOOGLE("google");

    private final String value;

    public static ProviderType convertToEnum(String type) {

        ProviderType provider;

        try {
            provider = ProviderType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidProviderTypeException();
        }

        return provider;

    }

}
