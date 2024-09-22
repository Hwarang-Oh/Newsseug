package com.a301.newsseug.domain.article.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "기사 상세 정보", description = "숏폼 재생 시 노출할 정보.")
public record DetailedArticleDto(



) {
}
