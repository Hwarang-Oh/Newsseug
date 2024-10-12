package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberFolderResponse;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import java.util.List;

public interface MemberFolderService {

    SlicedResponse<List<GetMemberFolderResponse>> getFoldersByMember(CustomUserDetails userDetails, int pageNumber);

}
