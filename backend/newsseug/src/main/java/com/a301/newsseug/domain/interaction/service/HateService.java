package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface HateService {

    void createHate(CustomUserDetails userDetails, Long articleId);
    void deleteHate(CustomUserDetails userDetails, Long articleId);
    
}
