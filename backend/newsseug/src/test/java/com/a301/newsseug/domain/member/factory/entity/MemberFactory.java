package com.a301.newsseug.domain.member.factory.entity;

import com.a301.newsseug.domain.member.factory.fixtures.MemberFixtures;
import com.a301.newsseug.domain.member.model.entity.type.GenderType;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.type.ProviderType;
import com.a301.newsseug.domain.member.model.entity.type.RoleType;
import java.time.LocalDate;
import org.springframework.test.util.ReflectionTestUtils;

public class MemberFactory {

    public static Member memberOfKakao(Long id) {

        Member member = Member.builder()
                .gender(GenderType.MALE)
                .birth(LocalDate.now())
                .role(RoleType.ROLE_MEMBER)
                .provider(ProviderType.KAKAO)
                .providerId(MemberFixtures.PROVIDER_ID)
                .build();

        ReflectionTestUtils.setField(member, "memberId", id);

        return member;
    }

}
