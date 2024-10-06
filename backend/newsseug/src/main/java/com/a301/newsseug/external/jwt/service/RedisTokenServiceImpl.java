package com.a301.newsseug.external.jwt.service;

import com.a301.newsseug.external.jwt.config.JwtProperties;
import java.util.Optional;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisTokenServiceImpl implements RedisTokenService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final String REFRESH_TOKEN_KEY_PREFIX = "member:%s:refresh_token:";
    private final JwtProperties jwtProperties;

    @Override
    public void save(String key, String value) {
        redisTemplate.opsForValue().set(
                String.format(REFRESH_TOKEN_KEY_PREFIX, key),
                value,
                jwtProperties.expiration().refresh(),
                TimeUnit.SECONDS
        );
    }

    @Override
    public Optional<String> findByKey(String key) {
        return Optional.ofNullable(
                (String) redisTemplate.opsForValue().get(String.format(REFRESH_TOKEN_KEY_PREFIX, key))
        );
    }

    @Override
    public void deleteByKey(String key) {
        redisTemplate.delete(String.format(REFRESH_TOKEN_KEY_PREFIX, key));
    }

}
