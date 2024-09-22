package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.response.FolderListResponse;
import com.a301.newsseug.domain.member.model.dto.request.MemberUpdateRequest;
import com.a301.newsseug.domain.press.model.dto.response.ListPressResponse;

public interface MemberService {

    void updateMember(CustomUserDetails userDetails, MemberUpdateRequest request);
    ListPressResponse getPressByMember(CustomUserDetails userDetails);
    Boolean subscribePress(CustomUserDetails userDetails, Long pressId);
    Boolean unsubscribePress(CustomUserDetails userDetails, Long pressId);

}
