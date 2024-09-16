package com.a301.newsseug.external.jwt.service;

import static com.a301.newsseug.external.jwt.model.entity.TokenType.ACCESS_TOKEN;
import static com.a301.newsseug.external.jwt.model.entity.TokenType.REFRESH_TOKEN;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.global.util.ClockUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final Environment env;

    public String issueToken(Member member, TokenType type) throws FailToIssueTokenException {

        if (Objects.nonNull(type)) {

            switch (type) {
                case ACCESS_TOKEN -> {
                    return createToken(member, env.getProperty("jwt.expiration.access"), type);
                }

                case REFRESH_TOKEN -> {
                    return createToken(member, env.getProperty("jwt.expiration.refresh"), type);
                }
            }

        }

        throw new FailToIssueTokenException();

    }

    private String createToken(Member member, String expirationTime, TokenType type) {

        LocalDateTime now = ClockUtil.getLocalDateTime();

        return  Jwts.builder()
                .header()
                .add("type", type.getValue())
                .and()
                .subject(String.valueOf(member.getId()))
                .claim("role", member.getOAuth2Details().getRole())
                .issuedAt(ClockUtil.convertToDate(now))
                .expiration(ClockUtil.getExpirationDate(now, Long.parseLong(expirationTime)))
                .signWith(Keys.hmacShaKeyFor(env.getProperty("jwt.secret").getBytes(StandardCharsets.UTF_8)))
                .compact();

    }

    public Header getHeader(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(env.getProperty("jwt.secret").getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getHeader();
    }

    public Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(env.getProperty("jwt.secret").getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isValidated(String token) throws JwtException {
        try {
            getClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

}
