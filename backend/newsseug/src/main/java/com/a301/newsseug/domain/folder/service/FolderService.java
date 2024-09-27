package com.a301.newsseug.domain.folder.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.dto.response.CreateFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.ListFolderResponse;

public interface FolderService {

    GetFolderResponse getFolder(CustomUserDetails userDetails, Long folderId);

    ListFolderResponse getFoldersByMember(CustomUserDetails userDetails);

    CreateFolderResponse createFolder(CustomUserDetails userDetails, String title);

}
