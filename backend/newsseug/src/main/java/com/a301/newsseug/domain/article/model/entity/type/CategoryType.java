package com.a301.newsseug.domain.article.model.entity.type;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "뉴스 카테고리")
public enum CategoryType {

    @Schema(description = "정치")
    POLITICS,

    @Schema(description = "겅제")
    ECONOMY,

    @Schema(description = "외교")
    DIPLOMACY,

    @Schema(description = "사건")
    INCIDENTS,

    @Schema(description = "과학")
    SCIENCE

}
