package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class CounterSchedulingServiceImpl implements CounterSchedulingService {

    private final RedisCounterService redisCounterService;
    private final ArticleRepository articleRepository;

    @Override
    @Scheduled(cron = "0 0/5 * * * ?")
    public void syncCounts() {
        syncCount("article:likeCount:", "likeCount");
        syncCount("article:hateCount:", "hateCount");
        syncCount("article:viewCount:", "viewCount");
    }

    private void syncCount(String redisHashKey, String column) {
        Map<Object, Object> countLogs = redisCounterService.findByHash(redisHashKey);

        if (Objects.nonNull(countLogs)) {
            for (Map.Entry<Object, Object> entry : countLogs.entrySet()) {
                Long articleId = Long.parseLong((String) entry.getKey());
                String count = (String) entry.getValue();

                if (Objects.nonNull(count)) {
                    log.info("Updating articleId: {}, New {}: {}", articleId, column, count);
                    articleRepository.updateCount(column, articleId, Long.parseLong(count));
                    redisCounterService.deleteByKey(redisHashKey, articleId);
                }
            }
        }

    }
}
