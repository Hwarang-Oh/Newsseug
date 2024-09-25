package com.a301.newsseug.external.jwt.factory.fixtures;

public class JwtFixtures {

    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String JWT_SECRET = "superSecretKeyForJWTGenerationMustBe32BytesLong";
    public static final String INVALID_JWT_SECRET = "superSecretKeyForJWTGenerationMustBe32BytesLo00";
    public static final long ACCESS_TOKEN_EXPIRATION = 180;
    public static final long REFRESH_TOKEN_EXPIRATION = 2592000;

}
