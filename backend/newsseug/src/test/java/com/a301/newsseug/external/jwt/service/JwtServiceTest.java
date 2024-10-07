package com.a301.newsseug.external.jwt.service;

import static com.a301.newsseug.domain.member.factory.fixtures.MemberFixtures.PROVIDER_ID;
import static com.a301.newsseug.external.jwt.factory.fixtures.JwtFixtures.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.config.JwtProperties;
import com.a301.newsseug.external.jwt.exception.ExpiredTokenException;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.exception.InvalidFormatException;
import com.a301.newsseug.external.jwt.exception.InvalidSignatureException;
import com.a301.newsseug.external.jwt.exception.UntrustworthyTokenException;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.global.util.ClockUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.MockedStatic;

@DisplayName("JWT 관련 기능")
@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

    @Mock
    private JwtProperties jwtProperties;

    @Mock
    private JwtProperties.Expiration expiration;

    @Mock
    private RedisTokenService redisTokenService;

    @InjectMocks
    private JwtServiceImpl jwtService;

    private MockedStatic<ClockUtil> mockedClockUtil;

    private Member member;
    private String providerId;
    private Clock clock;
    private LocalDateTime fixedLocalDateTime;
    private Date fixedDate;

    @BeforeEach
    void beforeEach() {
        lenient().when(jwtProperties.secret()).thenReturn(JWT_SECRET);
        lenient().when(jwtProperties.expiration()).thenReturn(expiration);
        lenient().when(expiration.access()).thenReturn(ACCESS_TOKEN_EXPIRATION);
        lenient().when(expiration.refresh()).thenReturn(REFRESH_TOKEN_EXPIRATION);

        member = MemberFactory.memberOfKakao(1L);
        providerId = member.getOAuth2Details().getProviderId();
        clock = Clock.systemDefaultZone();
        fixedLocalDateTime = LocalDateTime.now(clock);
        fixedDate = Date.from(fixedLocalDateTime.atZone(ZoneId.systemDefault()).toInstant());

        mockedClockUtil = mockStatic(ClockUtil.class);

        mockedClockUtil
                .when(ClockUtil::getLocalDateTime)
                .thenReturn(fixedLocalDateTime);

        mockedClockUtil
                .when(() -> ClockUtil.convertToDate(fixedLocalDateTime))
                .thenReturn(fixedDate);
    }

    @Test
    @DisplayName("토큰 발행[성공 - Access]")
    public void issueAccessToken() {
        // Given
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault())
                                .toInstant())
                );

        // When
        String issuedToken = jwtService.issueToken(providerId, TokenType.ACCESS_TOKEN);
        Header header = jwtService.parseHeader(issuedToken);
        Claims claims = jwtService.parseClaims(issuedToken);
        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();

        // Then
        assertThat(issuedToken).startsWith("Bearer ");
        assertThat(header.get("type")).isEqualTo(TokenType.ACCESS_TOKEN.getValue());
        assertThat(claims.getSubject()).isEqualTo(providerId);
        assertThat(issuedAt).isNotNull();
        assertThat(expiration).isNotNull();
        assertThat(expiration.getTime() - issuedAt.getTime()).isEqualTo(
                TimeUnit.SECONDS.toMillis(ACCESS_TOKEN_EXPIRATION));
    }

    @Test
    @DisplayName("토큰 발행[성공 - Refresh]")
    public void issueRefreshToken() {
        // Given
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, REFRESH_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(
                                fixedLocalDateTime.plusSeconds(REFRESH_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault())
                                        .toInstant())
                );

        // When
        String issuedToken = jwtService.issueToken(providerId, TokenType.REFRESH_TOKEN);
        Header header = jwtService.parseHeader(issuedToken);
        Claims claims = jwtService.parseClaims(issuedToken);
        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();

        // Then
        assertThat(issuedToken).startsWith("Bearer ");
        assertThat(header.get("type")).isEqualTo(TokenType.REFRESH_TOKEN.getValue());
        assertThat(claims.getSubject()).isEqualTo(providerId);
        assertThat(issuedAt).isNotNull();
        assertThat(expiration).isNotNull();
        assertThat(expiration.getTime() - issuedAt.getTime()).isEqualTo(
                TimeUnit.SECONDS.toMillis(REFRESH_TOKEN_EXPIRATION));
    }

    @Test
    @DisplayName("토큰 발행[실패]")
    public void failIssueToken() {
        assertThatThrownBy(() -> jwtService.issueToken(providerId, null))
                .isInstanceOf(FailToIssueTokenException.class);
    }

    @Test
    @DisplayName("토큰 재발행[성공]")
    void reissueAccessTokenSuccess() {
        // Given
        String refreshToken = "Bearer refreshToken";
        given(redisTokenService.findByKey(providerId)).willReturn(Optional.of(refreshToken));

        // When
        String reissuedAccessToken = jwtService.reissueAccessToken(refreshToken, providerId);

        // Then
        verify(redisTokenService).findByKey(providerId);
        assertThat(reissuedAccessToken).startsWith("Bearer ");
    }

    @Test
    @DisplayName("토큰 재발행[실패 - 만료된 리프레쉬 토큰]")
    void reissueAccessTokenFailByInvalidToken() {
        // Given
        String refreshToken = "Bearer refreshToken";
        given(redisTokenService.findByKey(providerId)).willReturn(Optional.empty());

        assertThatThrownBy(() -> jwtService.reissueAccessToken(refreshToken, providerId))
                .isInstanceOf(ExpiredTokenException.class);

        verify(redisTokenService).findByKey(providerId);
    }

    @Test
    @DisplayName("토큰 재발행[실패 - 신뢰할 수 없는 리프레시 토큰]")
    void reissueAccessTokenFailByUntrustworthyToken() {
        // Given
        String refreshToken = "Bearer refreshToken";
        String savedRefreshToken = "Bearer differentToken";
        given(redisTokenService.findByKey(providerId)).willReturn(Optional.of(savedRefreshToken));

        // When & Then
        assertThatThrownBy(() -> jwtService.reissueAccessToken(refreshToken, providerId))
                .isInstanceOf(UntrustworthyTokenException.class);

        verify(redisTokenService).findByKey(providerId);
    }


    @Test
    @DisplayName("토큰 재발행[실패 - 만료된 리프레쉬 토큰]")
    void reissueAccessTokenFailByExpiredToken() {
        // Given
        String refreshToken = "Bearer refreshToken";
        given(redisTokenService.findByKey(providerId)).willReturn(Optional.empty());

        assertThatThrownBy(() -> jwtService.reissueAccessToken(refreshToken, providerId))
                .isInstanceOf(ExpiredTokenException.class);

        verify(redisTokenService).findByKey(providerId);
    }

    @Test
    @DisplayName("리프레시 토큰 삭제[성공]")
    void discardRefreshTokenSuccess() {
        // Given
        given(redisTokenService.deleteByKey(providerId)).willReturn(true);

        // When
        Boolean result = jwtService.discardRefreshToken(providerId);

        // Then
        assertThat(result).isTrue();
        verify(redisTokenService).deleteByKey(providerId);
    }

    @Test
    @DisplayName("리프레시 토큰 삭제[실패]")
    void discardRefreshTokenFail() {
        // Given
        given(redisTokenService.deleteByKey(providerId)).willReturn(false);

        // When
        Boolean result = jwtService.discardRefreshToken(providerId);

        // Then
        assertThat(result).isFalse();
        verify(redisTokenService).deleteByKey(providerId);
    }

    @Test
    @DisplayName("토큰 추출[성공]")
    public void resolveTokenSuccess() {
        // Given
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        String accessToken = jwtService.issueToken(providerId, TokenType.ACCESS_TOKEN);
        given(request.getHeader(AUTHORIZATION)).willReturn(accessToken);

        // When
        String token = jwtService.resolveToken(request);

        // Then
        assertThat(token).isEqualTo(accessToken);
    }

    @Test
    @DisplayName("토큰 파싱[성공]")
    public void parseClaimsSuccess() {
        // Given
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault())
                                .toInstant())
                );

        String accessToken = jwtService.issueToken(providerId, TokenType.ACCESS_TOKEN);

        // When
        Claims claims = jwtService.parseClaims(accessToken);

        // Then
        assertThat(claims).isNotNull();
    }

    @Test
    @DisplayName("토큰 파싱[실패 - 신뢰할 수 없는 토큰]")
    public void parseClaimsFail() {
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault())
                                .toInstant())
                );

        assertThatThrownBy(() -> jwtService.parseClaims("fail"))
                .isInstanceOf(UntrustworthyTokenException.class);
    }

    @Test
    @DisplayName("토큰 검증[성공 - 정상]")
    public void invalidateTokenByTrue() {
        // Given
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault())
                                .toInstant())
                );

        String accessToken = jwtService.issueToken(providerId, TokenType.ACCESS_TOKEN);

        // When
        boolean isValid = jwtService.isValid(accessToken);

        // Then
        assertThat(isValid).isTrue();
    }

    @Test
    @DisplayName("토큰 검증[성공 - NULL]")
    public void invalidateTokenByNull() {
        // Given
        String token = null;

        // When
        boolean isValid = jwtService.isValid(token);

        // Then
        assertThat(isValid).isFalse();
    }

    @Test
    @DisplayName("토큰 검증[실패 - 서명 불일치]")
    public void invalidateSignatureToken() {
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(
                                fixedLocalDateTime.minusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault())
                                        .toInstant())
                );

        // Given
        String token = TOKEN_PREFIX.concat(
                Jwts.builder()
                        .header()
                        .add("type", TokenType.ACCESS_TOKEN.getValue())
                        .and()
                        .subject(PROVIDER_ID)
                        .issuedAt(ClockUtil.convertToDate(fixedLocalDateTime))
                        .expiration(ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                        .signWith(Keys.hmacShaKeyFor(INVALID_JWT_SECRET.getBytes(StandardCharsets.UTF_8)))
                        .compact()
        );

        // Then
        assertThatThrownBy(() -> jwtService.isValid(token))
                .isInstanceOf(InvalidSignatureException.class);
    }

    @Test
    @DisplayName("토큰 검증[실패 - 유효하지 않은 형식]")
    public void invalidateFormatToken() {
        String invalidToken = TOKEN_PREFIX.concat("invalidTokenString");

        assertThatThrownBy(() -> jwtService.isValid(invalidToken))
                .isInstanceOf(InvalidFormatException.class);
    }

    @Test
    @DisplayName("토큰 검증[실패 - 기간 만료]")
    public void invalidateExpiredToken() {
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(
                                fixedLocalDateTime.minusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault())
                                        .toInstant())
                );

        // Given
        String expiredToken = jwtService.issueToken(providerId, TokenType.ACCESS_TOKEN);

        // Then
        assertThatThrownBy(() -> jwtService.isValid(expiredToken))
                .isInstanceOf(ExpiredTokenException.class);
    }

    @AfterEach
    void afterEach() {
        if (Objects.nonNull(mockedClockUtil)) {
            mockedClockUtil.close();
        }
    }

}

