package com.a301.newsseug.domain.press.model.dto;

import com.a301.newsseug.domain.press.model.entity.Press;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "언론사 정보", description = "언론사 상세 조회 시 노출할 정보.")
public record PressDto(
	@Schema(description = "식별자")
	Long id,

	@Schema(description = "이름")
	String name,

	@Schema(description = "언론사 로고 URL")
	String imageUrl,

	@Schema(description = "언론사 소개")
	String description,

	@Schema(description = "구독자 수")
	Long subscribeCount

) {

	public static PressDto of(Press press) {
		return PressDto.builder()
			.id(press.getPressId())
			.name(press.getPressBranding().getName())
			.imageUrl(press.getPressBranding().getImageUrl())
			.description(press.getDescription())
			.subscribeCount(press.getSubscribeCount())
			.build();
	}

}
