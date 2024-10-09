package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.external.redis.config.RedisProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RedisCounterServiceImpl implements RedisCounterService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisProperties redisProperties;
    private final ArticleRepository articleRepository;

    @Override
    public void save(String hash, Long key, Long value) {
        redisTemplate.opsForHash().put(hash, key.toString(), value);
    }

    @Override
    public Map<Object, Object> findByHash(String hash) {
        return redisTemplate.opsForHash().entries(hash);
    }

    @Override
    public void deleteByHash(String hash) {
        redisTemplate.delete(hash);
    }

    @Override
    public Optional<Long> findByKey(String hash, Long key) {
        Object value = redisTemplate.opsForHash().get(hash, key.toString());
        if (Objects.isNull(value)) {
            return Optional.empty();
        }

        return Optional.of((Long) value);
    }

    @Override
    public void deleteByKey(String hash, Long key) {
        redisTemplate.opsForHash().delete(hash, key.toString());
    }

    @Override
    public Long increment(String hash, Long key, Long value) {

        long incrementedViewCount = redisTemplate.opsForHash().increment(hash, key, value);

        if (incrementedViewCount >= redisProperties.viewCounter().threshold()) {
            String[] filedName = hash.split(":");
            articleRepository.updateCount(filedName[1], key, incrementedViewCount);
            deleteByKey(hash, key);
        }

        return incrementedViewCount;

    }

}
