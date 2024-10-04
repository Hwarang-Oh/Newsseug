package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.external.redis.service.RedisHashService;
import com.a301.newsseug.external.redis.service.RedisKeyValueService;

public interface RedisViewCountService extends RedisHashService<String, String, Integer> {

}
