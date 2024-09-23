package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.type.ReportType;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface InteractionService {

    void postLikeToArticle(CustomUserDetails userDetails, Long articleId);

    void deleteLikeFromArticle(CustomUserDetails userDetails, Long articleId);

    void PostHateToArticle(CustomUserDetails userDetails, Long articleId);

    void deleteHateFromArticle(CustomUserDetails userDetails, Long articleId);

    void reportArticle(CustomUserDetails userDetails, Long articleId, ReportType reportType);
}
