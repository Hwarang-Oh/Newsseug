package com.a301.newsseug.domain.article.model.dto.response;

import com.a301.newsseug.domain.article.model.dto.SimpleArticleDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleHateDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleLikeDto;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "기사 상세 정보", description = "하나의 기사를 조회한 정보")
public record GetArticleResponse(

    SimpleArticleDto article,

    SimplePressDto press,

    Boolean subscribeStatus,

    SimpleLikeDto likeInfo,

    SimpleHateDto hateInfo

) {

    public static GetArticleResponse of(
            SimpleArticleDto article,
            SimplePressDto press,
            Boolean subscribeStatus,
            SimpleLikeDto likeInfo,
            SimpleHateDto hateInfo) {

        return GetArticleResponse.builder()
                .article(article)
                .press(press)
                .subscribeStatus(subscribeStatus)
                .likeInfo(likeInfo)
                .hateInfo(hateInfo)
                .build();

    }
}
