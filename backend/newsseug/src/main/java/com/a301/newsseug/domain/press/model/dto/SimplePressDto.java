package com.a301.newsseug.domain.press.model.dto;

import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.model.entity.Press;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "언론사 정보", description = "언론사 목록 조회 시 노출할 정보.")
public record SimplePressDto(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String name,

        @Schema(description = "사진")
        String imageUrl,

        @Schema(description = "구독 여부")
        Boolean isSubscribed

) {

    public static SimplePressDto of(Press press) {
        return SimplePressDto.builder()
                .id(press.getPressId())
                .name(press.getPressBranding().getName())
                .imageUrl(press.getPressBranding().getImageUrl())
                .isSubscribed(false)
                .build();
    }

    public static List<SimplePressDto> fromSubscribe(List<Subscribe> subscribes) {
        return subscribes.stream()
                .map(subscribe -> SimplePressDto.of(subscribe.getPress(), true))
                .toList();
    }

    public static SimplePressDto of(Press press, Boolean isSubscribed) {
        return SimplePressDto.builder()
            .id(press.getPressId())
            .name(press.getPressBranding().getName())
            .imageUrl(press.getPressBranding().getImageUrl())
            .isSubscribed(isSubscribed)
            .build();
    }

}
