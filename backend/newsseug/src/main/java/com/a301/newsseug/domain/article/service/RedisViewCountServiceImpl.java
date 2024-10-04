package com.a301.newsseug.domain.article.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Optional;

@RequiredArgsConstructor
public class RedisViewCountServiceImpl implements RedisViewCountService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void save(String hash, String key, Integer value) {

    }

    @Override
    public Optional<Integer> findByHash(String hash) {
        return Optional.empty();
    }

    @Override
    public void deleteByHash(String hash) {

    }

    @Override
    public Optional<Integer> findByKey(String hash, String key) {
        return Optional.empty();
    }

    @Override
    public void deleteByKey(String hash, String key) {

    }

    @Override
    public void increment(String hash, String key, Integer value) {

    }
}
