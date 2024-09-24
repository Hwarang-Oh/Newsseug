package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.type.ReportType;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface ReportService {

    void reportArticle(CustomUserDetails userDetails, Long articleId, ReportType reportType);

}
