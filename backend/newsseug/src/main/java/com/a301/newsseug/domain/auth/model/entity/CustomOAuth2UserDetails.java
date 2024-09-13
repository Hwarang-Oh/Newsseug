package com.a301.newsseug.domain.auth.model.entity;

import com.a301.newsseug.domain.member.model.entity.Member;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Builder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Builder(access = AccessLevel.PRIVATE)
public class CustomOAuth2UserDetails implements OAuth2User {

    private final Member member;
    private Map<String, Object> attributes;

    public static CustomOAuth2UserDetails of(Member member, Map<String, Object> attributes) {
        return CustomOAuth2UserDetails.builder()
                .member(member)
                .attributes(attributes)
                .build();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(
                (GrantedAuthority) () -> member.getOAuth2Details().getRole().name()
        );
    }

    @Override
    public String getName() {
        return member.getNickname();
    }

}
