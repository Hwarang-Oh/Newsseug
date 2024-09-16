package com.a301.newsseug.domain.auth.model.entity;

import com.a301.newsseug.domain.member.model.entity.ProviderType;
import java.util.Map;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class KakaoUserDetails implements OAuth2UserDetails {

    private final Map<String, Object> attributes;

    @Override
    public ProviderType getProvider() {
        return ProviderType.KAKAO;
    }

    @Override
    public String getProviderId() {
        return attributes.get("id").toString();
    }

}
