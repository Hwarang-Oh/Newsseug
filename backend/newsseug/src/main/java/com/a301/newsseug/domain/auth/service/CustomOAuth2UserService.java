package com.a301.newsseug.domain.auth.service;

import com.a301.newsseug.domain.auth.model.entity.CustomOAuth2UserDetails;
import com.a301.newsseug.domain.auth.model.entity.KakaoUserDetails;
import com.a301.newsseug.domain.auth.model.entity.OAuth2UserDetails;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.OAuth2Details;
import com.a301.newsseug.domain.member.model.entity.ProviderType;
import com.a301.newsseug.domain.member.model.entity.Role;
import com.a301.newsseug.domain.member.repository.MemberRepository;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final String KAKAO = "kakao";
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        log.info("getAttributes : {}", oAuth2User.getAttributes());

        String provider = userRequest.getClientRegistration().getRegistrationId();
        OAuth2UserDetails oAuth2UserDetails = null;

        switch (provider) {

            case KAKAO -> {
                log.info("카카오 로그인");
                oAuth2UserDetails = new KakaoUserDetails(oAuth2User.getAttributes());
            }

        }

        String providerId = oAuth2UserDetails.getProviderId();
        Member member = memberRepository.findByProviderId(providerId)
                .orElseGet(() ->
                     memberRepository.save(
                             Member.builder()
                                     .nickName("Test")
                                     .OAuth2Details(
                                             OAuth2Details.of(
                                                     ProviderType.convertToEnum(provider),
                                                     providerId,
                                                     Role.ROLE_USER
                                             )
                                     )
                                     .build()
                     )
                );

        return CustomOAuth2UserDetails.of(member, oAuth2User.getAttributes());

    }

}
