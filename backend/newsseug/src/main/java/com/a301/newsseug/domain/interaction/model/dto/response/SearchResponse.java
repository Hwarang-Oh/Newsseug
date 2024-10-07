package com.a301.newsseug.domain.interaction.model.dto.response;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
public record SearchResponse(

        @Schema(description = "언론사")
        List<GetPressResponse> press,

        @Schema(description = "기사")
        SlicedResponse<List<GetArticleResponse>> articles

) {

    public static SearchResponse of(
            List<GetPressResponse> press, SlicedResponse<List<GetArticleResponse>> articles
    ) {
        return SearchResponse.builder()
                .press(press)
                .articles(articles)
                .build();
    }

}
