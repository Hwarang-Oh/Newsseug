package com.a301.newsseug.external.jwt.service;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.config.JwtProperties;
import com.a301.newsseug.external.jwt.exception.ExpiredTokenException;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.exception.InvalidFormatException;
import com.a301.newsseug.external.jwt.exception.InvalidSignatureException;
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
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    private final JwtProperties jwtProperties;

    /**
     * 사용자 정보를 바탕으로 JWT 토큰을 발행하는 메서드
     * @param member 사용자 정보
     * @param type 토큰 타입 (ACCESS_TOKEN, REFRESH_TOKEN)
     * @return 발행된 JWT 토큰
     * @throws FailToIssueTokenException 토큰 발행 실패 시 예외 발생
     */
    public String issueToken(Member member, TokenType type) throws FailToIssueTokenException {

        if (Objects.nonNull(type)) {

            switch (type) {
                case ACCESS_TOKEN -> {
                    return createToken(member, jwtProperties.getExpiration().getAccess(), type);
                }

                case REFRESH_TOKEN -> {
                    return createToken(member, jwtProperties.getExpiration().getRefresh(), type);
                }
            }

        }

        throw new FailToIssueTokenException();

    }

    /**
     * JWT 토큰을 생성하는 메서드
     * @param member 사용자 정보
     * @param expirationTime 토큰 만료 시간
     * @param type 토큰 타입 (ACCESS_TOKEN, REFRESH_TOKEN)
     * @return 생성된 JWT 토큰
     */
    private String createToken(Member member, long expirationTime, TokenType type) {

        LocalDateTime now = ClockUtil.getLocalDateTime();
        System.out.println(now);

        return  Jwts.builder()
                .header()
                .add("type", type.getValue())
                .and()
                .subject(member.getOAuth2Details().getProviderId())
                .issuedAt(ClockUtil.convertToDate(now))
                .expiration(ClockUtil.getExpirationDate(now, expirationTime))
                .signWith(Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8)))
                .compact();

    }

    /**
     * JWT 토큰의 헤더를 파싱하는 메서드
     * @param token JWT 토큰
     * @return 파싱된 헤더
     */
    public Header parseHeader(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getHeader();
    }

    /**
     * JWT 토큰의 클레임을 파싱하는 메서드
     * @param token JWT 토큰
     * @return 파싱된 클레임
     */
    public Claims parseClaims(String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(jwtProperties.getSecret().getBytes(StandardCharsets.UTF_8)))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     * Authorization 헤더에서 Bearer 토큰을 추출하는 메서드
     * @param request HttpServletRequest 객체
     * @return 추출된 JWT 토큰
     */
    public String resolveToken(HttpServletRequest request) {

        String token = request.getHeader("Authorization");

        if (!Objects.isNull(token) && token.startsWith("Bearer ")) {
            return token.replace("Bearer ", "");
        }

        return null;

    }

    /**
     * JWT 토큰이 유효한지 검사하는 메서드
     * @param token JWT 토큰
     * @return 토큰이 유효한지 여부
     */
    public boolean isValid(String token) throws JwtException {

        if (!StringUtils.hasText(token)){
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
