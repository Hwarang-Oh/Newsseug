package com.a301.newsseug.external.redis.service;

import java.util.Optional;

public interface RedisKeyValueService<K, T> {

    void save(K key, T value);
    Optional<T> findByKey(K key);
    void deleteByKey(K key);

}
