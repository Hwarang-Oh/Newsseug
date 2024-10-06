package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.article.service.RedisCountService;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.entity.Hate;
import com.a301.newsseug.domain.interaction.model.entity.Like;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class HateServiceImpl implements HateService {

    private final ArticleRepository articleRepository;
    private final HateRepository hateRepository;
    private final LikeRepository likeRepository;
    private final RedisCountService redisCountService;

    @Override
    public void PostHateToArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();

        Article article = articleRepository.getOrThrow(articleId);

        Optional<Like> like = likeRepository.findByMemberAndArticle(loginMember, article);
        like.ifPresent(likeRepository::delete);

        hateRepository.save(
                Hate.builder()
                        .member(loginMember)
                        .article(article)
                        .build()
        );

        // Redis에서 hate 증가
        String hateHashKey = "article:hatecount";
        Long incrementValue = 1L;
        redisCountService.increment(hateHashKey, articleId, incrementValue);

    }

    @Override
    public void deleteHateFromArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);
        Hate hate = hateRepository.getOrThrow(loginMember, article);
        hateRepository.delete(hate);

    }

    @Scheduled(cron = "0 0/5 * * * ?")
    public void syncHateCounts() {

        String hateHashKey = "article:hatecount";

        Map<Object, Object> hateCountLogs = redisCountService.findByHash(hateHashKey);

        if (Objects.nonNull(hateCountLogs)) {
            for (Map.Entry<Object, Object> entry : hateCountLogs.entrySet()) {
                Long articleId = Long.parseLong((String) entry.getKey());
                String hateCount = (String) entry.getValue();

                if (Objects.nonNull(hateCount)) {
                    log.info("Updating articleId: {}, New hateCount: {}", articleId, hateCount);
                    articleRepository.updateCount("hateCount", articleId, Long.parseLong(hateCount));
                    redisCountService.deleteByKey("article:hatecount", articleId);
                }
            }
        }

    }

}
