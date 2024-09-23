package com.a301.newsseug.domain.article.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "전체 기사 목록", description = "홈 화면 전체 기사 목록 조회에 대해 노출할 정보.")
public record AllArticlesResponse(

        @Schema(description = "최신순 정렬된 전체 기사")
        ListArticleResponse allArticles

) {

        public static AllArticlesResponse of(ListArticleResponse allArticles) {
                return AllArticlesResponse.builder()
                        .allArticles(allArticles)
                        .build();
        }
}
