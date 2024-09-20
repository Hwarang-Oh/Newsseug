package com.a301.newsseug.domain.press.model.entity;

import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Embeddable
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class PressBranding {

	private String name;

	private String imageUrl;

	public static PressBranding of(String name, String imageUrl) {
		return PressBranding.builder()
			.name(name)
			.imageUrl(imageUrl)
			.build();
	}
}
