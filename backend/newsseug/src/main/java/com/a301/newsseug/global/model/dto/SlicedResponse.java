package com.a301.newsseug.global.model.dto;

import com.a301.newsseug.global.model.entity.SliceDetails;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SlicedResponse<T> {

    @Schema(description = "슬라이싱 정보")
    private SliceDetails sliceDetails;

    @Schema(description = "결과")
    private T content;

    private SlicedResponse(SliceDetails sliceDetails, T content) {
        this.sliceDetails = sliceDetails;
        this.content = content;
    }

    public static <T> SlicedResponse<T> of(SliceDetails sliceDetails, T data) {
        return new SlicedResponse<>(sliceDetails, data);
    }

}
