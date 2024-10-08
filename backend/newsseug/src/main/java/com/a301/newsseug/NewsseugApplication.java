package com.a301.newsseug;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
@ConfigurationPropertiesScan
public class NewsseugApplication {

	public static void main(String[] args) {
		SpringApplication.run(NewsseugApplication.class, args);
	}

}
