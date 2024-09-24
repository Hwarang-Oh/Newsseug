package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface LikeService {

    void postLikeToArticle(CustomUserDetails userDetails, Long articleId);
    void deleteLikeFromArticle(CustomUserDetails userDetails, Long articleId);
    
}
