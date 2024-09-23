package com.a301.newsseug.domain.bookmark.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface BookmarkService {
    void createBookmark(CustomUserDetails userDetails, Long folderId, Long articleId);
}
