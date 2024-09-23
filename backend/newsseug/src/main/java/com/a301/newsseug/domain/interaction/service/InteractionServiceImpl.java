package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.entity.Hate;
import com.a301.newsseug.domain.interaction.model.entity.Like;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
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

    private final MemberRepository memberRepository;

    private final LikeRepository likeRepository;

    private final HateRepository hateRepository;

    private final ArticleRepository articleRepository;

    @Override
    public Boolean postLikeToArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Like like = Like.builder()
                .member(loginMember)
                .article(article)
                .build();

        likeRepository.save(like);

        return Boolean.TRUE;

    }

    @Override
    public Boolean deleteLikeFromArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Like like = likeRepository.getOrThrow(loginMember, article);

        likeRepository.delete(like);

        return Boolean.TRUE;

    }

    @Override
    public Boolean PostHateToArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Hate hate = Hate.builder()
                .member(loginMember)
                .article(article)
                .build();

        hateRepository.save(hate);

        return Boolean.TRUE;

    }

}
