    package com.a301.newsseug.domain.auth.model.entity;

import com.a301.newsseug.domain.member.model.entity.type.ProviderType;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Getter;

    @Getter
@AllArgsConstructor
public class GoogleUserDetails implements OAuth2UserDetails {

    private Map<String, Object> attributes;

    @Override
    public ProviderType getProvider() {
        return ProviderType.GOOGLE;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

}
