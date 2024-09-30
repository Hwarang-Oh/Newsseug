package com.a301.newsseug.domain.article.model.entity.type;

import com.a301.newsseug.domain.article.exception.InvalidReportTypeException;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
@Schema(description = "뉴스 변환 결과")
public enum ConversionStatus {

    @Schema(description = "성공")
    SUCCESS("success"),

    @Schema(description = "진행중")
    RUNNING("running"),

    @Schema(description = "필터링되어진 기사")
    FILTERED("filtered"),

    @Schema(description = "토큰 초과")
    EXCEED_TOKEN("exceed_token"),

    @Schema(description = "알 수 없는 오류")
    UNKNOWN_FAIL("unknown_fail");

    private final String value;

    public static ConversionStatus convertToEnum(String statusValue) {

        ConversionStatus conversionStatus;

        try{
            conversionStatus = ConversionStatus.valueOf(statusValue.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidReportTypeException();
        }

        return conversionStatus;
    }

}
