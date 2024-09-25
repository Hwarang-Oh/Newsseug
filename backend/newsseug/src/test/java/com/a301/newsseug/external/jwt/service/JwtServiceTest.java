package com.a301.newsseug.external.jwt.service;

import static com.a301.newsseug.external.jwt.factory.fixtures.JwtFixtures.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

import com.a301.newsseug.domain.member.factory.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.config.JwtProperties;
import com.a301.newsseug.external.jwt.exception.ExpiredTokenException;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.exception.InvalidFormatException;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.global.util.ClockUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import java.time.Clock;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
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

        member = MemberFactory.memberOfKakao();
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
    @DisplayName("토큰 파싱")
    public void parseClaims() {

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        Claims claims = jwtService.parseClaims(accessToken);
        assertThat(claims).isNotNull();

    }

    @Test
    @DisplayName("토큰 검증[정상]")
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
    @DisplayName("토큰 검증[유효하지 않은 형식]")
    public void invalidateFormatToken() {

        String invalidToken = TOKEN_PREFIX.concat("invalidTokenString");
        assertThatThrownBy(() -> jwtService.isValid(invalidToken))
                .isInstanceOf(InvalidFormatException.class);

    }

    @Test
    @DisplayName("토큰 검증[기간 만료]")
    public void expiredToken() {

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.minusSeconds(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        String expiredToken = jwtService.issueToken(member.getOAuth2Details().getProviderId(), TokenType.ACCESS_TOKEN);
        assertThatThrownBy(() -> jwtService.isValid(expiredToken))
                .isInstanceOf(ExpiredTokenException.class);

    }

    @AfterEach
    void afterEach() {
        if (mockedClockUtil != null) {
            mockedClockUtil.close();
        }
    }

}

