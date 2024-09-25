package com.a301.newsseug.domain.member.model.entity;

import com.a301.newsseug.domain.member.model.entity.type.GenderType;
import com.a301.newsseug.domain.member.model.entity.type.ProviderType;
import com.a301.newsseug.domain.member.model.entity.type.RoleType;
import com.a301.newsseug.global.model.entity.BaseEntity;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Entity
@Table(name = "members")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long memberId;

    @Setter
    private String nickname;

    @Setter
    private String profileImageUrl;

    @Setter
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Setter
    private LocalDate birth;

    @Embedded
    private OAuth2Details oAuth2Details;

    @Builder
    public Member(
            String nickName, String profileImageUrl, GenderType gender, LocalDate birth, ProviderType provider, String providerId, RoleType role
    ) {
        this.nickname = nickName;
        this.profileImageUrl = profileImageUrl;
        this.gender = gender;
        this.birth = birth;
        this.oAuth2Details = OAuth2Details.of(provider, providerId, role);
    }

}