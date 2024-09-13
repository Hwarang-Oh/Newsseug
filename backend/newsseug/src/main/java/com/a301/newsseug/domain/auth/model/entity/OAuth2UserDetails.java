package com.a301.newsseug.domain.auth.model.entity;

import com.a301.newsseug.domain.member.model.entity.ProviderType;

public interface OAuth2UserDetails {

    ProviderType getProvider();
    String getProviderId();

}
