package com.a301.newsseug.domain.press.model.dto.response;

import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.model.entity.Press;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "언론사 정보", description = "언론사 목록 조회 시 노출할 정보.")
public record GetPressResponse(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String name,

        @Schema(description = "사진")
        String imageUrl,

        @Schema(description = "구독 여부")
        Boolean isSubscribed

) {

    public static GetPressResponse of(Press press) {
        return GetPressResponse.builder()
                .id(press.getPressId())
                .name(press.getPressBranding().getName())
                .imageUrl(press.getPressBranding().getImageUrl())
                .isSubscribed(false)
                .build();
    }

    public static List<GetPressResponse> fromSubscribe(List<Subscribe> subscribes) {
        return subscribes.stream()
                .map(subscribe -> GetPressResponse.of(subscribe.getPress(), true))
                .toList();
    }

    public static GetPressResponse of(Press press, Boolean isSubscribed) {
        return GetPressResponse.builder()
            .id(press.getPressId())
            .name(press.getPressBranding().getName())
            .imageUrl(press.getPressBranding().getImageUrl())
            .isSubscribed(isSubscribed)
            .build();
    }

    public static List<GetPressResponse> of(List<Press> press, Set<Press> subscribePress) {
        return press.stream()
                .map(p -> GetPressResponse.of(p, subscribePress.contains(p)))
                .toList();
    }

}
