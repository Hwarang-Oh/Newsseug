package com.a301.newsseug.domain.article.model.entity.type;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "신고 유형")
public enum ReportType {

    @Schema(description = "마음에 들지 않습니다.")
    DISLIKE,

    @Schema(description = "해당 내용은 스팸입니다.")
    SPAM,

    @Schema(description = "혐오 발언 또는 상징")
    HATE_SPEECH_OR_SYMBOLS,

    @Schema(description = "거짓 정보")
    MISINFORMATION,

    @Schema(description = "선정적인 컨텐츠")
    EXPLICIT_CONTENT

}
