package com.a301.newsseug.external.jwt.service;

import static com.a301.newsseug.external.jwt.model.entity.TokenType.ACCESS_TOKEN;
import static com.a301.newsseug.external.jwt.model.entity.TokenType.REFRESH_TOKEN;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final Environment env;

    public String issueAccessToken(String memberId) {
        return Jwts.builder()
                .subject(memberId)
                .claim("type", ACCESS_TOKEN.getValue())
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + env.getProperty("jwt.expiration.access"))
                )
                .signWith(Keys.hmacShaKeyFor(
                        env.getProperty("jwt.secret").getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    public String issueRefreshToken() {
        return Jwts.builder()
                .claim("type", REFRESH_TOKEN.getValue())
                .issuedAt(new Date())
                .expiration(
                        new Date(System.currentTimeMillis() + env.getProperty("jwt.expiration.refresh"))
                )
                .signWith(Keys.hmacShaKeyFor(
                        env.getProperty("jwt.secret").getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

}
