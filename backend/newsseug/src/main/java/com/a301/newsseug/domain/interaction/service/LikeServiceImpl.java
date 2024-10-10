package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.article.service.RedisCounterService;
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
@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final ArticleRepository articleRepository;
    private final LikeRepository likeRepository;
    private final HateRepository hateRepository;
    private final RedisCounterService redisCounterService;

    @Override
    @Transactional
    public void createLike(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);
        Optional<Hate> hate = hateRepository.findByMemberAndArticle(loginMember, article);

        if (hate.isEmpty()) {
            likeRepository.save(Like.builder()
                    .member(loginMember)
                    .article(article)
                    .build()
            );
        }

        hateRepository.delete(hate.get());
        redisCounterService.incrementAsync("article:hateCount", articleId, -1L);

    }

    @Override
    @Transactional
    public void deleteLike(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);
        Like like = likeRepository.getOrThrow(loginMember, article);
        likeRepository.delete(like);

    }

}
