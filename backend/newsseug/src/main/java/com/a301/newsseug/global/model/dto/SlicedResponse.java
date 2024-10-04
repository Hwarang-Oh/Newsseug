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
    private T contents;

    private SlicedResponse(SliceDetails sliceDetails, T contents) {
        this.sliceDetails = sliceDetails;
        this.contents = contents;
    }

    public static <T> SlicedResponse<T> of(SliceDetails sliceDetails, T contents) {
        return new SlicedResponse<>(sliceDetails, contents);
    }

}
