package com.a301.newsseug.domain.auth.service;

import com.a301.newsseug.domain.auth.model.dto.response.LoginResponse;
import com.a301.newsseug.domain.auth.model.dto.response.ReissueTokenResponse;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.MemberRepository;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import com.a301.newsseug.external.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public LoginResponse login(String providerId) {
        Member member = memberRepository.getOrThrow(providerId);
        return LoginResponse.of(
                jwtService.issueToken(providerId, TokenType.ACCESS_TOKEN),
                jwtService.issueToken(providerId, TokenType.REFRESH_TOKEN),
                member.getIsFirst()
        );
    }

    @Override
    public Boolean logout(CustomUserDetails userDetails, String providerId) {
        return jwtService.discardRefreshToken(providerId);
    }

    @Override
    public ReissueTokenResponse reissueToken(String refreshToken, String providerId) {
        return ReissueTokenResponse.of(jwtService.reissueAccessToken(refreshToken, providerId));
    }

}
