package com.a301.newsseug.external.jwt.model.entity;

import java.time.Duration;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum TokenType {

    ACCESS_TOKEN("accessToken"),
    REFRESH_TOKEN("refreshToken");

    private final String value;

}
