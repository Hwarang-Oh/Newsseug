package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.response.FolderListResponse;
import com.a301.newsseug.domain.member.model.dto.request.MemberUpdateRequest;

public interface MemberService {

    void updateMember(CustomUserDetails userDetails, MemberUpdateRequest request);

}
