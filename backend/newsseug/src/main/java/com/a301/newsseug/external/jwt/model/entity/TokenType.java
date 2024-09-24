package com.a301.newsseug.external.jwt.model.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum TokenType {

    ACCESS_TOKEN("access-Token"),
    REFRESH_TOKEN("refresh-Token");

    private final String value;

}
