package com.a301.newsseug.domain.press.model.dto.response;

import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Builder;

@Builder
@Schema(name = "언론사 목록", description = "언론사 목록 조회에 대해 노출할 정보.")
public record ListPressResponse(

        @Schema(description = "언론사 정보")
        List<SimplePressDto> press

) {

    public static ListPressResponse of(List<SimplePressDto> press) {
        return ListPressResponse.builder()
                .press(press)
                .build();
    }

}
