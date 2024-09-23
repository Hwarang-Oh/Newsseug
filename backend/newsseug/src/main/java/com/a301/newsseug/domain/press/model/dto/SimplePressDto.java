package com.a301.newsseug.domain.press.model.dto;

import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.model.entity.Press;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;

@Builder
@Schema(name = "언론사 정보", description = "언론사 목록 조회시 노출할 정보.")
public record SimplePressDto(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String name,

        @Schema(description = "사진")
        String imageUrl

) {

    public static SimplePressDto of(Press press) {
        return SimplePressDto.builder()
                .id(press.getPressId())
                .name(press.getPressBranding().getName())
                .imageUrl(press.getPressBranding().getImageUrl())
                .build();
    }

    public static List<SimplePressDto> fromSubscribe(List<Subscribe> subscribes) {
        return subscribes.stream()
                .map(subscribe -> SimplePressDto.of(subscribe.getPress()))
                .collect(Collectors.toList());
    }


}
