package com.a301.newsseug.domain.press.model.dto.response;

import com.a301.newsseug.domain.press.model.entity.Press;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "언론사 상세 조회", description = "하나의 언론사에 대해 노출할 정보")
public record GetPressDetailsResponse(
	
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

	public static GetPressDetailsResponse of(Press press) {
		return GetPressDetailsResponse.builder()
			.id(press.getPressId())
			.name(press.getPressBranding().getName())
			.imageUrl(press.getPressBranding().getImageUrl())
			.description(press.getDescription())
			.subscribeCount(press.getSubscribeCount())
			.isSubscribed(false)
			.build();
	}

	public static List<GetPressDetailsResponse> of(List<Press> press) {
		return press.stream()
				.map(GetPressDetailsResponse::of)
				.toList();
	}

	public static GetPressDetailsResponse of(Press press, Boolean isSubscribed) {
		return GetPressDetailsResponse.builder()
			.id(press.getPressId())
			.name(press.getPressBranding().getName())
			.imageUrl(press.getPressBranding().getImageUrl())
			.description(press.getDescription())
			.subscribeCount(press.getSubscribeCount())
			.isSubscribed(isSubscribed)
			.build();
	}

	public static List<GetPressDetailsResponse> of(List<Press> press, Set<Press> subscribePress) {
		return press.stream()
				.map(p -> GetPressDetailsResponse.of(p, subscribePress.contains(p)))
				.toList();
	}

}
