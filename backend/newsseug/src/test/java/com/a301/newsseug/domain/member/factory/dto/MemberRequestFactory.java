package com.a301.newsseug.domain.member.factory.dto;

import static com.a301.newsseug.domain.member.factory.fixtures.MemberFixtures.birth;
import static com.a301.newsseug.domain.member.factory.fixtures.MemberFixtures.gender;
import static com.a301.newsseug.domain.member.factory.fixtures.MemberFixtures.nickname;

import com.a301.newsseug.domain.member.model.dto.request.UpdateMemberRequest;

public class MemberRequestFactory {

    public static UpdateMemberRequest updateMemberRequest() {
        return new UpdateMemberRequest(
                nickname,
                gender,
                birth
        );
    }

}
