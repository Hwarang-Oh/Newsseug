package com.a301.newsseug.domain.member.model.entity.type;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum RoleType {

    ROLE_MEMBER("ROLE_MEMBER","MEMBER"), ROLE_ADMIN("ROLE_ADMIN", "ADMIN");

    private final String authority;
    private final String role;

}
