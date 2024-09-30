package com.a301.newsseug.external.swagger.config;

import static org.springframework.security.config.Elements.JWT;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.press.model.entity.Press;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {

        Server devServer = new Server();
        devServer.setDescription("dev");
        devServer.setUrl("https://j11a301.p.ssafy.io");

        Server localServer = new Server();
        localServer.setDescription("local");
        localServer.setUrl("http://localhost:8080");

        return new OpenAPI()
                .info(apiInfo())
                .servers(List.of(devServer, localServer))
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
                .pathsToMatch("/api/v1/auth/**", "/api/v1/members/**")
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

    @Bean
    public GroupedOpenApi folderApi() {

        return GroupedOpenApi.builder()
                .group(Folder.class.getSimpleName())
                .pathsToMatch("/api/v1/folders/**", "/api/v1/bookmarks/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi articleApi() {

        return GroupedOpenApi.builder()
                .group(Article.class.getSimpleName())
                .pathsToMatch("/api/v1/articles/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }

    @Bean
    public GroupedOpenApi interactionApi() {

        return GroupedOpenApi.builder()
                .group("Interaction")
                .pathsToMatch("/api/v1/likes/**", "/api/v1/hates/**", "/api/v1/reports/**", "/api/v1/histories/**")
                .addOpenApiCustomizer(openApi
                                -> openApi.addSecurityItem(
                                new SecurityRequirement().addList("Bearer")
                        )
                )
                .build();

    }



}
