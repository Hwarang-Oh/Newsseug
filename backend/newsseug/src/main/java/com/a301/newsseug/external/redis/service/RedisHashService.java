package com.a301.newsseug.external.redis.service;

import java.util.Optional;

public interface RedisHashService<H, K, T> {

    void save(H hash, K key, T value);
    Optional<T> findByHash(H hash);
    void deleteByHash(H hash);
    Optional<T> findByKey(H hash, K key);
    void deleteByKey(H hash, K key);
    void increment(H hash, K key, T value);

}
