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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Objects;
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

        redisCounterService.increment("article:likeCount", articleId, 1L);

    }

    @Override
    public void deleteLikeFromArticle(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);
        Like like = likeRepository.getOrThrow(loginMember, article);
        likeRepository.delete(like);
        redisCounterService.increment("article:likeCount", articleId,  -1L);

    }

    @Scheduled(cron = "0 0/5 * * * ?")
    public void syncLikeCounts() {

        String likeHashKey = "article:likecount";

        Map<Object, Object> likeCountLogs = redisCounterService.findByHash(likeHashKey);

        if (Objects.nonNull(likeCountLogs)) {
            for (Map.Entry<Object, Object> entry : likeCountLogs.entrySet()) {
                Long articleId = Long.parseLong((String) entry.getKey());
                String likeCount = (String) entry.getValue();

                if (Objects.nonNull(likeCount)) {
                    log.info("Updating articleId: {}, New likeCount: {}", articleId, likeCount);
                    articleRepository.updateCount("likeCount", articleId, Long.parseLong(likeCount));
                    redisCounterService.deleteByKey("article:likeCount", articleId);
                }
            }
        }

    }
}
