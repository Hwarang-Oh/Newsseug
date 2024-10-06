package com.a301.newsseug.external.redis.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@ConfigurationProperties(prefix = "redis")
public class CountProperties {

    private final int threshold;

    public CountProperties(int threshold) {
        this.threshold = threshold;
    }

}
