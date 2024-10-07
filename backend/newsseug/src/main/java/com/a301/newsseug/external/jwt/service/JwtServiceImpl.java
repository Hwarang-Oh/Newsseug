package com.a301.newsseug.external.jwt.service;

import static org.apache.http.HttpHeaders.AUTHORIZATION;

import com.a301.newsseug.external.jwt.config.JwtProperties;
import com.a301.newsseug.external.jwt.exception.ExpiredTokenException;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.exception.InvalidFormatException;
import com.a301.newsseug.external.jwt.exception.InvalidSignatureException;
import com.a301.newsseug.external.jwt.exception.UntrustworthyTokenException;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.global.util.ClockUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private static final String TOKEN_PREFIX = "Bearer ";

    private final JwtProperties jwtProperties;
    private final RedisTokenService redisTokenService;

    @Override
    public String issueToken(String providerId, TokenType type) {

        if (Objects.nonNull(type)) {

            switch (type) {
                case ACCESS_TOKEN -> {
                    return createToken(providerId, jwtProperties.expiration().access(), type);
                }

                case REFRESH_TOKEN -> {
                    String refreshToken = createToken(providerId, jwtProperties.expiration().refresh(), type);
                    redisTokenService.save(providerId, refreshToken);
                    return refreshToken;
                }

            }

        }

        throw new FailToIssueTokenException();

    }

    @Override
    public String reissueAccessToken(String refreshToken, String providerId) {

        Optional<String> savedRefreshToken = redisTokenService.findByKey(providerId);

        if (savedRefreshToken.isEmpty()) {
            throw new ExpiredTokenException();
        }

        if (!savedRefreshToken.get().equals(refreshToken))  {
            throw new UntrustworthyTokenException();
        }

        return createToken(providerId, jwtProperties.expiration().access(), TokenType.ACCESS_TOKEN);

    }

    private String createToken(String providerId, long expirationTime, TokenType type) {

        LocalDateTime now = ClockUtil.getLocalDateTime();

        return TOKEN_PREFIX.concat(
                Jwts.builder()
                        .header()
                        .add("type", type.getValue())
                        .and()
                        .subject(providerId)
                        .issuedAt(ClockUtil.convertToDate(now))
                        .expiration(ClockUtil.getExpirationDate(now, expirationTime))
                        .signWith(Keys.hmacShaKeyFor(jwtProperties.secret().getBytes(StandardCharsets.UTF_8)))
                        .compact()
        );

    }

    @Override
    public Boolean discardRefreshToken(String providerId) {
        return redisTokenService.deleteByKey(providerId);
    }

    @Override
    public Header parseHeader(String token) {

        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(jwtProperties.secret().getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(removePrefix(token))
                .getHeader();
    }

    @Override
    public Claims parseClaims(String token) {

        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(jwtProperties.secret().getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(removePrefix(token))
                .getPayload();

    }

    @Override
    public String resolveToken(HttpServletRequest request) throws InvalidFormatException {
        return request.getHeader(AUTHORIZATION);
    }

    private String removePrefix(String token) {

        if (!token.startsWith(TOKEN_PREFIX)) {
            throw new UntrustworthyTokenException();
        }

        return token.replace(TOKEN_PREFIX, "");

    }

    @Override
    public boolean isValid(String token) throws JwtException {

        if (Objects.isNull(token)) {
            return false;
        }

        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException e) {
            throw new ExpiredTokenException();
        } catch (SignatureException e) {
            throw new InvalidSignatureException();
        } catch (MalformedJwtException e) {
            throw new InvalidFormatException();
        }

    }

}
