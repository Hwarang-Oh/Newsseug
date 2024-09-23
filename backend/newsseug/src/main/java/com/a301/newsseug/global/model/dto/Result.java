package com.a301.newsseug.global.model.dto;

import com.a301.newsseug.global.util.ClockUtil;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class Result<T> {

    @Schema(description = "요청 시간")
    private String timestamp;

    @Schema(description = "추적 ID")
    private UUID trackingId;

    @Schema(description = "결과")
    private T data;

    private Result(T data) {
        this.timestamp = ClockUtil.getLocalDateTimeToString();
        this.trackingId = UUID.randomUUID();
        this.data = data;
    }

    public static <T> Result<T> of(T data) {
        return new Result<>(data);
    }

    public static <T> Result<T> empty() {
        return new Result<>(null);
    }

}
