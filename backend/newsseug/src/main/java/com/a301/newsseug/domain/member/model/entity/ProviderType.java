package com.a301.newsseug.domain.member.model.entity;

import com.a301.newsseug.domain.member.exception.InvalidProviderTypeException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProviderType {

    KAKAO("kakao"), GOOGLE("google");

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
