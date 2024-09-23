package com.a301.newsseug.domain.article.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "홈 화면 주제별 기사 목록", description = "주제별 기사 목록 조회에 대해 노출할 정보.")
public record HomeArticlesResponse(

        @Schema(description = "오늘의 뉴스")
        ListArticleResponse todayArticles,

        @Schema(description = "20대 관심 기사")
        ListArticleResponse articlesFor20s,

        @Schema(description = "전체 기사")
        ListArticleResponse allArticles

) {

        public static HomeArticlesResponse of(ListArticleResponse todayArticles, ListArticleResponse articlesFor20s, ListArticleResponse allArticles) {
                return HomeArticlesResponse.builder()
                        .todayArticles(todayArticles)
                        .articlesFor20s(articlesFor20s)
                        .allArticles(allArticles)
                        .build();
        }
}
