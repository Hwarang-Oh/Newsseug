package com.a301.newsseug.domain.article.model.dto.response;

import com.a301.newsseug.domain.article.model.dto.ArticleShortFormDto;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.interaction.model.dto.SimpleHateDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleLikeDto;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "기사 상세 정보", description = "하나의 기사를 조회한 정보")
public record GetArticleResponse(

        @Schema(description = "기사 정보", examples = {"Object"})
        ArticleShortFormDto article,

        @Schema(description = "언론사 정보", examples = {"Object"})
        SimplePressDto press,

        @Schema(description = "구독 유무", examples = {"TRUE"})
        Boolean isSubscribe,

        @Schema(description = "좋아요 유무와 개수", examples = {"Object"})
        SimpleLikeDto likeInfo,

        @Schema(description = "싫어요 유무와 개수", examples = {"Object"})
        SimpleHateDto hateInfo

) {

    public static GetArticleResponse of(
            Article article,
            Boolean isSubscribe,
            SimpleLikeDto likeInfo,
            SimpleHateDto hateInfo) {

        return GetArticleResponse.builder()
                .article(ArticleShortFormDto.of(article))
                .press(SimplePressDto.of(article.getPress()))
                .isSubscribe(isSubscribe)
                .likeInfo(likeInfo)
                .hateInfo(hateInfo)
                .build();

    }
}
