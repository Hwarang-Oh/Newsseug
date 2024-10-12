package com.a301.newsseug.domain.member.model.dto.response;

import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.model.entity.Press;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "구독 정보", description = "사용자가 구독한 언론사 목록 조회 시 노출할 정보.")
public record GetSubscribeResponse(

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "이름")
        String name,

        @Schema(description = "사진")
        String imageUrl,

        @Schema(description = "구독 여부")
        Boolean isSubscribed

) {

    public static GetSubscribeResponse of(Subscribe subscribe, Boolean isSubscribed) {
        return GetSubscribeResponse.builder()
                .id(subscribe.getPress().getPressId())
                .name(subscribe.getPress().getPressBranding().getName())
                .imageUrl(subscribe.getPress().getPressBranding().getImageUrl())
                .isSubscribed(isSubscribed)
                .build();
    }

    public static List<GetSubscribeResponse> of(List<Subscribe> subscribes) {
        return subscribes.stream()
                .map(subscribe -> GetSubscribeResponse.of(subscribe, true))
                .toList();
    }

    public static List<GetSubscribeResponse> of(List<Subscribe> subscribes, Set<Press> subscribePress) {
        return subscribes.stream()
                .map(subscribe -> GetSubscribeResponse.of(subscribe, subscribePress.contains(subscribe.getPress())))
                .toList();
    }

}
