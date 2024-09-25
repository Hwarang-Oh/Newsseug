package com.a301.newsseug.domain.member.factory;

import com.a301.newsseug.domain.member.model.entity.type.GenderType;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.type.ProviderType;
import com.a301.newsseug.domain.member.model.entity.type.RoleType;
import java.time.LocalDate;
import org.springframework.test.util.ReflectionTestUtils;

public class MemberFactory {

    public static Member memberOfKakao() {

        Member member = Member.builder()
                .nickName("test")
                .gender(GenderType.MALE)
                .birth(LocalDate.now())
                .role(RoleType.ROLE_MEMBER)
                .provider(ProviderType.KAKAO)
                .providerId("test")
                .build();

        ReflectionTestUtils.setField(member, "memberId", 1L);

        return member;
    }

}
