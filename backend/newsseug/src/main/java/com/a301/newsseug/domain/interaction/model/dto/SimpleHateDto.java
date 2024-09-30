package com.a301.newsseug.domain.interaction.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "싫어요 정보", description = "단일 기사에 노출할 싫어요 유무 및 개수 정보")
public record SimpleHateDto(

        Boolean isHate,

        Long hateCount

) {

    public static SimpleHateDto of(Boolean isHate, Long hateCount) {
        return SimpleHateDto.builder()
                .isHate(isHate)
                .hateCount(hateCount)
                .build();
    }

}
