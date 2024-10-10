package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface LikeService {

    void createLike(CustomUserDetails userDetails, Long articleId);
    void deleteLike(CustomUserDetails userDetails, Long articleId);
    
}
