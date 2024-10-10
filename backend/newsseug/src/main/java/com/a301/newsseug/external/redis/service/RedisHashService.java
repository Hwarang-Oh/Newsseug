package com.a301.newsseug.external.redis.service;

import java.util.Map;
import java.util.Optional;

public interface RedisHashService<H, HK, HV> {

    void save(H hash, HK key, HV value);
    Map<Object, Object> findByHash(H hash);
    void deleteByHash(H hash);
    Optional<HV> findByKey(H hash, HK key);
    void deleteByKey(H hash, HK key);
    Long increment(H hash, HK key, HV value);
    void incrementAsync(String hash, Long HashKey, Long value);

}
