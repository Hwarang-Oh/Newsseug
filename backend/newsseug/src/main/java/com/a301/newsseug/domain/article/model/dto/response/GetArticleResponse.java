package com.a301.newsseug.domain.article.model.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "기사 상세 정보", description = "하나의 기사를 조회한 정보")
public record GetArticleResponse(



) {
}
