package com.a301.newsseug.domain.article.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisCounterServiceImpl implements RedisCounterService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void save(String hash, Long HashKey, Long value) {
        redisTemplate.opsForHash().put(hash, HashKey.toString(), value);
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
    public Optional<Long> findByKey(String hash, Long HashKey) {

        Number value = (Number) redisTemplate.opsForHash().get(hash, HashKey.toString());

        if (Objects.nonNull(value)) {
            return Optional.of(value.longValue());
        }

        return Optional.empty();

    }

    @Override
    public void deleteByKey(String hash, Long HashKey) {
        redisTemplate.opsForHash().delete(hash, HashKey.toString());
    }

    @Override
    public Long increment(String hash, Long HashKey, Long value) {
        return redisTemplate.opsForHash().increment(hash, HashKey.toString(), value);
    }

    @Override
    @Async("asyncExecutor")
    public void incrementAsync(String hash, Long HashKey, Long value) {
        try {
            redisTemplate.opsForHash().increment(hash, HashKey.toString(), value);
        } catch (Exception e) {
            log.error("Failed to increment Redis value for hash: {}, key: {}, by: {}", hash, HashKey, value, e);
        }
    }

}
