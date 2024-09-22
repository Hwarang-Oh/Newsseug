package com.a301.newsseug.domain.press.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;

@Builder
@Schema(name = "언론사 정보", description = "언론사 목록 조회시 노출할 정보.")
public record SimplePressDto(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String name,

        @Schema(description = "사진")
        String imageUrl,

        @Schema(description = "구독 여부")
        boolean isSubscribed

) {

    public static SimplePressDto of(Long id, String name, String imageUrl, boolean isSubscribed) {
        return SimplePressDto.builder()
                .id(id)
                .name(name)
                .imageUrl(imageUrl)
                .isSubscribed(isSubscribed)
                .build();
    }

}
