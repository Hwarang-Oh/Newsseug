package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface InteractionService {

    Boolean postLikeToArticle(CustomUserDetails userDetails, Long articleId);

    Boolean deleteLikeFromArticle(CustomUserDetails userDetails, Long articleId);

    Boolean PostHateToArticle(CustomUserDetails userDetails, Long articleId);
}
