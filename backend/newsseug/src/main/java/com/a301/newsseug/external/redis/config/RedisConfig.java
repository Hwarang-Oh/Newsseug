package com.a301.newsseug.external.redis.config;

import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@RequiredArgsConstructor
public class RedisConfig {

    private final Environment env;

    @Bean
    public RedisConnectionFactory redisConnectionFactory(){

        return new LettuceConnectionFactory(
                Objects.requireNonNull(env.getProperty("spring.data.redis.host")),
                Integer.parseInt(Objects.requireNonNull(env.getProperty("spring.data.redis.port")))
        );

    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory redisConnectionFactory) {

        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

        // 트랜잭션 지원 활성화 (높은 트래픽에서 성능적으로 영향이 있을 수 있음)
        redisTemplate.setEnableTransactionSupport(true);

        // Redis 통신을 관리를 위한 ConnectionFactory 설정
        redisTemplate.setConnectionFactory(redisConnectionFactory);

        // Key는 String 타입으로 직렬화
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        redisTemplate.setHashKeySerializer(new StringRedisSerializer());

        // Hash의 Value는 JSON 형식으로 직렬화
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
        redisTemplate.setHashValueSerializer(new GenericJackson2JsonRedisSerializer());

        return redisTemplate;

    }

}
