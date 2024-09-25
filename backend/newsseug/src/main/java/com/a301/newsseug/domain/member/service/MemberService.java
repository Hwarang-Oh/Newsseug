package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.dto.request.MemberUpdateRequest;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;

public interface MemberService {

    void updateMember(CustomUserDetails userDetails, MemberUpdateRequest request);
    ListSimplePressResponse getPressByMember(CustomUserDetails userDetails);
    void subscribe(CustomUserDetails userDetails, Long pressId);
    void unsubscribe(CustomUserDetails userDetails, Long pressId);

}
