package com.a301.newsseug.external.jwt.service;

import static com.a301.newsseug.external.jwt.factory.fixtures.JwtFixtures.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

import com.a301.newsseug.domain.member.factory.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
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
import org.springframework.core.env.Environment;

@DisplayName("JWT 관련 기능")
@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

    @Mock
    private Environment env;

    @InjectMocks
    private JwtService jwtService;

    private MockedStatic<ClockUtil> mockedClockUtil;

    private Member member = MemberFactory.memberOfKakao();

    @BeforeEach
    void beforeEach() {

        lenient().when(env.getProperty("jwt.secret")).thenReturn(JWT_SECRET);
        lenient().when(env.getProperty("jwt.expiration.access")).thenReturn(String.valueOf(ACCESS_TOKEN_EXPIRATION));
        lenient().when(env.getProperty("jwt.expiration.refresh")).thenReturn(String.valueOf(REFRESH_TOKEN_EXPIRATION));

        Clock clock = Clock.systemDefaultZone();
        LocalDateTime fixedLocalDateTime = LocalDateTime.now(clock);
        Date fixedDate = Date.from(fixedLocalDateTime.atZone(ZoneId.systemDefault()).toInstant());

        mockedClockUtil = mockStatic(ClockUtil.class);

        mockedClockUtil
                .when(ClockUtil::getLocalDateTime)
                .thenReturn(fixedLocalDateTime);

        mockedClockUtil
                .when(() -> ClockUtil.convertToDate(fixedLocalDateTime))
                .thenReturn(fixedDate);

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, ACCESS_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusDays(ACCESS_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

        mockedClockUtil
                .when(() -> ClockUtil.getExpirationDate(fixedLocalDateTime, REFRESH_TOKEN_EXPIRATION))
                .thenReturn(
                        Date.from(fixedLocalDateTime.plusDays(REFRESH_TOKEN_EXPIRATION).atZone(ZoneId.systemDefault()).toInstant())
                );

    }

    @Test
    @DisplayName("토큰 발행(Access)")
    public void issueAccessToken() {

        String accessToken = jwtService.issueToken(member, TokenType.ACCESS_TOKEN);
        Header header = jwtService.getHeader(accessToken);
        Claims claims = jwtService.getClaims(accessToken);

        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();

        assertThat(header.get("type")).isEqualTo(TokenType.ACCESS_TOKEN.getValue());
        assertThat(claims.getSubject()).isEqualTo(String.valueOf(member.getId()));
        assertThat(issuedAt).isNotNull();
        assertThat(expiration).isNotNull();
        assertThat(expiration.getTime() - issuedAt.getTime()).isEqualTo(TimeUnit.DAYS.toMillis(ACCESS_TOKEN_EXPIRATION));

    }

    @Test
    @DisplayName("토큰 발행(Refresh)")
    public void issueRefreshToken() {

        String refreshToken = jwtService.issueToken(member, TokenType.REFRESH_TOKEN);
        Header header = jwtService.getHeader(refreshToken);
        Claims claims = jwtService.getClaims(refreshToken);

        Date issuedAt = claims.getIssuedAt();
        Date expiration = claims.getExpiration();

        assertThat(header.get("type")).isEqualTo(TokenType.REFRESH_TOKEN.getValue());
        assertThat(claims.getSubject()).isEqualTo(String.valueOf(member.getId()));
        assertThat(issuedAt).isNotNull();
        assertThat(expiration).isNotNull();
        assertThat(expiration.getTime() - issuedAt.getTime()).isEqualTo(TimeUnit.DAYS.toMillis(REFRESH_TOKEN_EXPIRATION));

    }

    @Test
    @DisplayName("토큰 발행 실패")
    public void failIssueToken() {
        assertThatThrownBy(() -> jwtService.issueToken(member, null))
                .isInstanceOf(FailToIssueTokenException.class);
    }

    @Test
    @DisplayName("토큰 파싱")
    public void getClaims() {
        String accessToken = jwtService.issueToken(member, TokenType.ACCESS_TOKEN);
        Claims claims = jwtService.getClaims(accessToken);
        assertThat(claims).isNotNull();
    }

    @Test
    @DisplayName("토큰 검증(정상)")
    public void invalidateTokenByTrue() {
        String accessToken = jwtService.issueToken(member, TokenType.ACCESS_TOKEN);
        boolean isValid = jwtService.isValidated(accessToken);
        assertThat(isValid).isTrue();
    }

    @Test
    @DisplayName("토큰 검증(비정상)")
    public void invalidateTokenByFalse() {
        String invalidToken = "invalidTokenString";
        boolean isValid = jwtService.isValidated(invalidToken);
        assertThat(isValid).isFalse();
    }

    @AfterEach
    void afterEach() {
        if (mockedClockUtil != null) {
            mockedClockUtil.close();
        }
    }

}

