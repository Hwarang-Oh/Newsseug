package com.a301.newsseug.external.redis.service;

import java.util.Optional;

public interface RedisKeyValueService<T, KEY> {

    void save(KEY key, T value);
    Optional<T> findByKey(KEY key);
    void deleteByKey(KEY key);

}
