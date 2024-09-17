package com.a301.newsseug.external.jwt.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    @Getter
    @RequiredArgsConstructor
    public static class Expiration {
        private final long access;
        private final long refresh;
    }

    private final String secret;
    private final Expiration expiration;

    public JwtProperties(String secret, Expiration expiration) {
        this.secret = secret;
        this.expiration = expiration;
    }

}
