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
    private final String REFRESH_TOKEN_KEY_PREFIX = "member:%d:refresh_token:";
    private final JwtProperties jwtProperties;

    @Override
    public void save(Long id, String value) {
        redisTemplate.opsForValue().set(
                String.format(REFRESH_TOKEN_KEY_PREFIX, id),
                value,
                jwtProperties.getExpiration().getRefresh(),
                TimeUnit.DAYS
        );
    }

    @Override
    public Optional<String> findByKey(Long id) {
        return Optional.ofNullable(
                (String) redisTemplate.opsForValue().get(String.format(REFRESH_TOKEN_KEY_PREFIX, id))
        );
    }

    @Override
    public void deleteByKey(Long id) {
        redisTemplate.delete(String.format(REFRESH_TOKEN_KEY_PREFIX, id));
    }

}
