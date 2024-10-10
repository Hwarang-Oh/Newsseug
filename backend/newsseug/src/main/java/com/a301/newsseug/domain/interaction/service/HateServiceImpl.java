package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.article.service.RedisCounterService;
import com.a301.newsseug.domain.article.service.RedisCounterServiceImpl;
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
public class HateServiceImpl implements HateService {

    private final ArticleRepository articleRepository;
    private final HateRepository hateRepository;
    private final LikeRepository likeRepository;
    private final RedisCounterService redisCounterService;


    @Override
    public void createHate(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);
        Optional<Like> like = likeRepository.findByMemberAndArticle(loginMember, article);

        if (like.isPresent()) {
            likeRepository.delete(like.get());
            redisCounterService.incrementAsync("article:likeCount:", articleId, -1L);
        }

        hateRepository.save(
                Hate.builder()
                        .member(loginMember)
                        .article(article)
                        .build()
        );
        redisCounterService.incrementAsync("article:hateCount:", articleId, 1L);

    }

    @Override
    public void deleteHate(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);
        Hate hate = hateRepository.getOrThrow(loginMember, article);
        hateRepository.delete(hate);
        redisCounterService.incrementAsync("article:hateCount:", articleId, -1L);

    }

}
