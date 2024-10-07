package com.a301.newsseug.domain.auth.model.entity;

import com.a301.newsseug.domain.member.model.entity.Member;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@Builder(access = AccessLevel.PRIVATE)
public class CustomUserDetails implements UserDetails {

    private final Member member;

    public static CustomUserDetails of(Member member) {
        return CustomUserDetails.builder()
                .member(member)
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(
                (GrantedAuthority) () -> member.getOAuth2Details().getRole().name()
        );
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return member.getOAuth2Details().getProviderId();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {

        if (Objects.nonNull(member)) {
            return true;
        }

        return false;

    }

}
