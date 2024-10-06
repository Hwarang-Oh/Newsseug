package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.external.redis.service.RedisHashService;

public interface RedisCountService extends RedisHashService<String, Long, Long> {

}
