package com.a301.newsseug.external.redis.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "redis")
public record RedisProperties(
        ViewCounter viewCounter
) {
    public record ViewCounter(
            Long threshold
    ) { }
}
