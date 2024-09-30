package com.a301.newsseug.domain.folder.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.dto.response.CreateFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderDetailsResponse;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import java.util.List;

public interface FolderService {

    GetFolderDetailsResponse getFolder(CustomUserDetails userDetails, Long folderId);

    List<GetFolderResponse> getFolders(CustomUserDetails userDetails);

    CreateFolderResponse createFolder(CustomUserDetails userDetails, String title);

}
