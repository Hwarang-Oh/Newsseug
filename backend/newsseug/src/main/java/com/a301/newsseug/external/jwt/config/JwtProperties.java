package com.a301.newsseug.external.jwt.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt")
public record JwtProperties(
        String secret,
        Expiration expiration
) {
    public record Expiration(long access, long refresh) { }
}
