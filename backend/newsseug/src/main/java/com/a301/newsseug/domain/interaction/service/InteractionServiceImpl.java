package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.ReportType;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.entity.Hate;
import com.a301.newsseug.domain.interaction.model.entity.Like;
import com.a301.newsseug.domain.interaction.model.entity.Report;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.interaction.repository.ReportRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class InteractionServiceImpl implements InteractionService {

    private final ArticleRepository articleRepository;

    private final LikeRepository likeRepository;

    private final HateRepository hateRepository;

    private final ReportRepository reportRepository;


    @Override
    public void postLikeToArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Like like = Like.builder()
                .member(loginMember)
                .article(article)
                .build();

        likeRepository.save(like);

    }

    @Override
    public void deleteLikeFromArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Like like = likeRepository.getOrThrow(loginMember, article);

        likeRepository.delete(like);

    }

    @Override
    public void PostHateToArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Hate hate = Hate.builder()
                .member(loginMember)
                .article(article)
                .build();

        hateRepository.save(hate);

    }

    @Override
    public void deleteHateFromArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Hate hate = hateRepository.getOrThrow(loginMember, article);

        hateRepository.delete(hate);

    }

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
