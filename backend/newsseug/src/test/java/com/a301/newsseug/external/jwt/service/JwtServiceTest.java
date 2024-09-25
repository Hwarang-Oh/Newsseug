package com.a301.newsseug.external.jwt.service;

import static com.a301.newsseug.domain.member.factory.fixtures.MemberFixtures.providerId;
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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Objects;
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

    @InjectMocks
    private JwtServiceImpl jwtService;

    private MockedStatic<ClockUtil> mockedClockUtil;

    private Member member;
    private Clock clock;
    private LocalDateTime fixedLocalDateTime;
    private Date fixedDate;
    private java.lang.String accessToken;

    @BeforeEach
    void beforeEach() {

        lenient().when(jwtProperties.getSecret()).thenReturn(JWT_SECRET);
        lenient().when(jwtProperties.getExpiration()).thenReturn(expiration);
        lenient().when(expiration.getAccess()).thenReturn(ACCESS_TOKEN_EXPIRATION);
        lenient().when(expiration.getRefresh()).thenReturn(REFRESH_TOKEN_EXPIRATION);

        member = MemberFactory.memberOfKakao(1L);
        clock = Clock.systemDefaultZone();
        fixedLocalDateTime = LocalDateTime.now(clock);
        fixedDate = Date.from(fixedLocalDateTime.atZone(ZoneId.systemDefault()).toInstant());
        accessToken = jwtService.issueToken(member.getOAuth2Details().getProviderId(), TokenType.ACCESS_TOKEN);

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
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        Header header = jwtService.parseHeader(accessToken);
        Claims claims = jwtService.parseClaims(accessToken);

        // When
        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();

        // Then
        assertThat(header.get("type")).isEqualTo(TokenType.ACCESS_TOKEN.getValue());
        assertThat(claims.getSubject()).isEqualTo(member.getOAuth2Details().getProviderId());
        assertThat(issuedAt).isNotNull();
        assertThat(expiration).isNotNull();
        assertThat(expiration.getTime() - issuedAt.getTime()).isEqualTo(TimeUnit.SECONDS.toMillis(ACCESS_TOKEN_EXPIRATION));

    }

    @Test
    @DisplayName("토큰 발행[성공 - Refresh]")
    public void issueRefreshToken() {


        // Given
        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, REFRESH_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(REFRESH_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        String refreshToken = jwtService.issueToken(member.getOAuth2Details().getProviderId(), TokenType.REFRESH_TOKEN);
        Header header = jwtService.parseHeader(refreshToken);
        Claims claims = jwtService.parseClaims(refreshToken);

        // When
        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();

        // Then
        assertThat(header.get("type")).isEqualTo(TokenType.REFRESH_TOKEN.getValue());
        assertThat(claims.getSubject()).isEqualTo(member.getOAuth2Details().getProviderId());
        assertThat(issuedAt).isNotNull();
        assertThat(expiration).isNotNull();
        assertThat(expiration.getTime() - issuedAt.getTime()).isEqualTo(TimeUnit.SECONDS.toMillis(REFRESH_TOKEN_EXPIRATION));

    }

    @Test
    @DisplayName("토큰 발행[실패]")
    public void failIssueToken() {
        assertThatThrownBy(() -> jwtService.issueToken(member.getOAuth2Details().getProviderId(), null))
                .isInstanceOf(FailToIssueTokenException.class);
    }

    @Test
    @DisplayName("토큰 추출[성공]")
    public void resolveToken() {

        // Given
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        String validToken = "Bearer validAccessToken";

        given(request.getHeader(AUTHORIZATION)).willReturn(validToken);

        // When
        String token = jwtService.resolveToken(request);

        // Then
        assertThat(token).isEqualTo(validToken);

    }

    @Test
    @DisplayName("토큰 파싱[성공]")
    public void parseClaimsSuccess() {

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        Claims claims = jwtService.parseClaims(accessToken);
        assertThat(claims).isNotNull();

    }

    @Test
    @DisplayName("토큰 파싱[실패 - 신뢰할 수 없는 토큰]")
    public void parseClaimsFail() {

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        assertThatThrownBy(() -> jwtService.parseClaims("fail"))
                .isInstanceOf(UntrustworthyTokenException.class);

    }

    @Test
    @DisplayName("토큰 검증[성공 - 정상]")
    public void invalidateTokenByTrue() {

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        boolean isValid = jwtService.isValid(accessToken);
        assertThat(isValid).isTrue();

    }

    @Test
    @DisplayName("토큰 검증[성공 - NULL]")
    public void invalidateTokenByNull() {

        // Given
        String token = null;

        // When
        Boolean isValid = jwtService.isValid(token);

        // Then
        assertThat(isValid).isFalse();


    }

    @Test
    @DisplayName("토큰 검증[실패 - 서명 불일치]")
    public void invalidateSignatureToken() {

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.minusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        // Given
        String token =TOKEN_PREFIX.concat(
                Jwts.builder()
                        .header()
                        .add("type", TokenType.ACCESS_TOKEN.getValue())
                        .and()
                        .subject(providerId)
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
                        Date.from(fixedLocalDateTime.minusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        // Given
        String expiredToken = jwtService.issueToken(member.getOAuth2Details().getProviderId(), TokenType.ACCESS_TOKEN);

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

