package com.a301.newsseug.external.redis.service;

import java.util.Map;
import java.util.Optional;

public interface RedisHashService<H, K, T> {

    void save(H hash, K key, T value);
    Map<Object, Object> findByHash(H hash);
    void deleteByHash(H hash);
    Optional<T> findByKey(H hash, K key);
    void deleteByKey(H hash, K key);
    Long increment(H hash, K key, T value);

}
