package com.a301.newsseug.domain.member.factory;

import com.a301.newsseug.domain.member.model.entity.GenderType;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.ProviderType;
import com.a301.newsseug.domain.member.model.entity.Role;
import com.a301.newsseug.global.util.ClockUtil;
import java.time.LocalDate;
import org.springframework.test.util.ReflectionTestUtils;

public class MemberFactory {


    public static Member memberOfKakao() {

        Member member = Member.builder()
                .nickName("test")
                .gender(GenderType.MALE)
                .birth(LocalDate.now())
                .role(Role.ROLE_MEMBER)
                .providerType(ProviderType.KAKAO)
                .providerId("test")
                .build();

        ReflectionTestUtils.setField(member, "id", 1L);

        return member;
    }

}
