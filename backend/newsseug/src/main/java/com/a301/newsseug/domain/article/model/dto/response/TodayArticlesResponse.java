package com.a301.newsseug.domain.article.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "오늘의 뉴스 기사 목록", description = "홈 화면 오늘의 뉴스 기사 목록 조회에 대해 노출할 정보.")
public record TodayArticlesResponse(

        @Schema(description = "오늘의 뉴스")
        ListArticleResponse todayArticles

) {

        public static TodayArticlesResponse of(ListArticleResponse todayArticles) {
                return TodayArticlesResponse.builder()
                        .todayArticles(todayArticles)
                        .build();
        }
}
