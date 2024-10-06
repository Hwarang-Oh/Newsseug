package com.a301.newsseug.external.aws.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "aws")
public record AwsProperties(
        S3 s3,
        Credentials credentials,
        String region
) {
    public record S3(String bucket, Long duration) { }
    public record Credentials(String accessKey, String secretKey) { }
}
