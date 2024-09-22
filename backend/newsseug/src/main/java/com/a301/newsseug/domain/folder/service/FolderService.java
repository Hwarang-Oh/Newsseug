package com.a301.newsseug.domain.folder.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.response.FolderListResponse;

public interface FolderService {

    FolderListResponse getFoldersByMember(CustomUserDetails userDetails);

}
