package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface HateService {

    void PostHateToArticle(CustomUserDetails userDetails, Long articleId);
    void deleteHateFromArticle(CustomUserDetails userDetails, Long articleId);
    
}
