package com.a301.newsseug.global.config;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@EnableAsync
@Configuration
public class AsyncConfig {

    @Bean(name = "asyncExecutor")
    public Executor asyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();

        // 최적화된 풀 설정
        executor.setCorePoolSize(10);        // 기본적으로 유지할 최소 쓰레드 수
        executor.setMaxPoolSize(20);         // 최대 생성할 쓰레드 수
        executor.setQueueCapacity(100);      // 큐에 대기할 최대 작업 수
        executor.setKeepAliveSeconds(60);    // 유휴 쓰레드를 유지할 시간 (초)

        executor.setThreadNamePrefix("AsyncThread-"); // 쓰레드 이름 설정
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy()); // 큐가 가득 찼을 때 처리 방식

        executor.initialize();
        return executor;
    }

}
