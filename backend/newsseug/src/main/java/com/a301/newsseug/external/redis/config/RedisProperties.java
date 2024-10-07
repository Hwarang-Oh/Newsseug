package com.a301.newsseug.external.redis.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.swing.text.View;

@ConfigurationProperties(prefix = "redis")
public record RedisProperties(
        ViewCounter viewCounter
) {
    public record ViewCounter(
            int threshold
    ) { }
}
