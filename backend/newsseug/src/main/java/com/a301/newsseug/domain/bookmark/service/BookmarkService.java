package com.a301.newsseug.domain.bookmark.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.model.dto.request.CreateBookmarkRequest;

public interface BookmarkService {

    void createBookmark(CustomUserDetails userDetails, CreateBookmarkRequest request);

}
