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
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.UUID;
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
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "members_seq")
    @SequenceGenerator(name = "members_seq", sequenceName = "members_seq", allocationSize = 1)
    private Long memberId;

    @Setter
    private String nickname = UUID.randomUUID().toString().substring(0, 6);

    @Setter
    private String profileImageUrl = "https://newsseug-bucket.s3.ap-northeast-2.amazonaws.com/profile/member/default/profile.svg";

    @Setter
    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @Setter
    private LocalDate birth;

    @Embedded
    private OAuth2Details oAuth2Details;

    @Builder
    public Member(
            GenderType gender, LocalDate birth, ProviderType provider, String providerId, RoleType role
    ) {
        this.nickname = UUID.randomUUID().toString().substring(0, 6);
        this.profileImageUrl = "https://newsseug-bucket.s3.ap-northeast-2.amazonaws.com/profile/member/default/profile.svg";
        this.gender = gender;
        this.birth = birth;
        this.oAuth2Details = OAuth2Details.of(provider, providerId, role);
    }

}