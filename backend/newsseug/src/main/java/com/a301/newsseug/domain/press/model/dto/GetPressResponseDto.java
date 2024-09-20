package com.a301.newsseug.domain.press.model.dto;

import com.a301.newsseug.domain.press.model.entity.Press;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class GetPressResponseDto {
	private Long pressId;
	private String name;
	private String imageUrl;
	private String description;
	private Long subscribeCount;
}
