package com.a301.newsseug.domain.article.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RedisCountServiceImpl implements RedisCountService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void save(String hash, Long key, Long value) {
        redisTemplate.opsForHash().put(hash, key, value);
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
        Object value = redisTemplate.opsForHash().get(hash, key);
        if (Objects.isNull(value)) {
            return Optional.empty();
        }

        return Optional.of((Long) value);
    }

    @Override
    public void deleteByKey(String hash, Long key) {
        redisTemplate.opsForHash().delete(hash, key);
    }

    @Override
    public Long increment(String hash, Long key, Long value) {
        return redisTemplate.opsForHash().increment(hash, key, value);
    }
}
