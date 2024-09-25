package com.a301.newsseug.domain.press.model.dto.response;

import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "언론사 목록", description = "언론사 목록 조회에 대해 노출할 정보.")
public record ListSimplePressResponse(

        @Schema(description = "언론사 정보")
        List<SimplePressDto> press

) {

    public static ListSimplePressResponse of(List<SimplePressDto> press) {
        return ListSimplePressResponse.builder()
                .press(press)
                .build();
    }

}
