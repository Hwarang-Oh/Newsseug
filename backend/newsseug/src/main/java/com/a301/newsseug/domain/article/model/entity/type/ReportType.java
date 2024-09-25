package com.a301.newsseug.domain.article.model.entity.type;

import com.a301.newsseug.domain.article.exception.InvalidReportTypeException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "신고 유형")
public enum ReportType {

    @Schema(description = "마음에 들지 않습니다.")
    DISLIKE("dislike"),

    @Schema(description = "해당 내용은 스팸입니다.")
    SPAM("spam"),

    @Schema(description = "혐오 발언 또는 상징")
    HATE_SPEECH_OR_SYMBOLS("hate_speech_or_symbols"),

    @Schema(description = "거짓 정보")
    MISINFORMATION("explicit_content"),

    @Schema(description = "선정적인 컨텐츠")
    EXPLICIT_CONTENT("explicit_content");

    private final String value;

    public static ReportType convertToEnum(String reportValue) {

        ReportType reportType;

        try{
            reportType = ReportType.valueOf(reportValue.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidReportTypeException();
        }

        return reportType;
    }

}
