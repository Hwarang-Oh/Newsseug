package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.entity.Hate;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class HateServiceImpl implements HateService {

    private final ArticleRepository articleRepository;
    private final HateRepository hateRepository;


    @Override
    public void PostHateToArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);

        hateRepository.save(
                Hate.builder()
                        .member(loginMember)
                        .article(article)
                        .build()
        );

    }

    @Override
    public void deleteHateFromArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);
        Hate hate = hateRepository.getOrThrow(loginMember, article);
        hateRepository.delete(hate);

    }


}
