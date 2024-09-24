package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.ReportType;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.entity.Report;
import com.a301.newsseug.domain.interaction.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ArticleRepository articleRepository;
    private final ReportRepository reportRepository;

    @Override
    public void reportArticle(CustomUserDetails userDetails, Long articleId, ReportType reportType) {

        Article article = articleRepository.getOrThrow(articleId);

        Report report = Report.builder()
                .article(article)
                .type(reportType)
                .build();

        reportRepository.save(report);

    }

}
