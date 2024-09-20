package com.a301.newsseug.external.swagger.config;

import static org.springframework.security.config.Elements.JWT;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.press.model.entity.Press;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .components(
                        new Components().addSecuritySchemes(
                                "Bearer",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("Bearer")
                                        .bearerFormat(JWT))
                );
    }

    private Info apiInfo() {
        return new Info()
                .title("뉴쓱 API")
                .description("뉴쓱 API 명세서입니다.")
                .version("v1");
    }

    @Bean
    public GroupedOpenApi memberApi() {

        return GroupedOpenApi.builder()
                .group(Member.class.getSimpleName())
                .pathsToMatch("/api/v1/members/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi pressApi() {

        return GroupedOpenApi.builder()
                .group(Press.class.getSimpleName())
                .pathsToMatch("/api/v1/press/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

}
