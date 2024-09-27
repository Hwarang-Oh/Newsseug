package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.entity.Hate;
import com.a301.newsseug.domain.interaction.model.entity.Like;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final ArticleRepository articleRepository;
    private final LikeRepository likeRepository;
    private final HateRepository hateRepository;

    @Override
    public void postLikeToArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Optional<Hate> hate = hateRepository.findByMemberAndArticle(loginMember, article);
        hate.ifPresent(hateRepository::delete);

        likeRepository.save(Like.builder()
                .member(loginMember)
                .article(article)
                .build()
        );

    }

    @Override
    public void deleteLikeFromArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Like like = likeRepository.getOrThrow(loginMember, article);

        likeRepository.delete(like);

    }


}
