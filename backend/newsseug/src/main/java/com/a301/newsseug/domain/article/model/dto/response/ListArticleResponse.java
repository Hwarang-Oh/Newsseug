package com.a301.newsseug.domain.article.model.dto.response;

import com.a301.newsseug.domain.article.model.dto.SimpleArticleDto;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

import java.util.List;

@Builder
@Schema(name = "기사 목록", description = "기사 목록을 조회한 결과")
public record ListArticleResponse(

        List<SimpleArticleDto> articles

) {

    public static ListArticleResponse of(List<SimpleArticleDto> articles) {
        return ListArticleResponse.builder()
                .articles(articles)
                .build();
    }
}
