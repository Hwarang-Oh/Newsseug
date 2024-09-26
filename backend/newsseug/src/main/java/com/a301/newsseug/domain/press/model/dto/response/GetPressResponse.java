package com.a301.newsseug.domain.press.model.dto.response;

import com.a301.newsseug.domain.press.model.entity.Press;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "언론사 단건 조회", description = "하나의 언론사에 대해 노출할 정보")
public record GetPressResponse(
	
	@Schema(description = "식별자")
	Long id,

	@Schema(description = "언론사 명")
	String name,

	@Schema(description = "언론사 로고 URL")
	String imageUrl,

	@Schema(description = "언론사 소개")
	String description,

	@Schema(description = "구독자 수")
	Long subscribeCount,

	@Schema(description = "구독 여부")
	Boolean isSubscribed

) {

	public static GetPressResponse of(Press press) {
		return GetPressResponse.builder()
			.id(press.getPressId())
			.name(press.getPressBranding().getName())
			.imageUrl(press.getPressBranding().getImageUrl())
			.description(press.getDescription())
			.subscribeCount(press.getSubscribeCount())
			.isSubscribed(false)
			.build();
	}

	public static GetPressResponse of(Press press, Boolean isSubscribed) {
		return GetPressResponse.builder()
			.id(press.getPressId())
			.name(press.getPressBranding().getName())
			.imageUrl(press.getPressBranding().getImageUrl())
			.description(press.getDescription())
			.subscribeCount(press.getSubscribeCount())
			.isSubscribed(isSubscribed)
			.build();
	}

}
