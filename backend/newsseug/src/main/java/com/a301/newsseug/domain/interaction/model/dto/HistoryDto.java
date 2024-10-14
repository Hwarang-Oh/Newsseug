package com.a301.newsseug.domain.interaction.model.dto;

import com.a301.newsseug.domain.interaction.model.entity.History;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.time.LocalTime;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "시청 기록", description = "사용자가 시청한 기사 정보")
public record HistoryDto(

	@Schema(name = "식별자")
	Long id,

	@Schema(name = "시청한 숏폼 제목")
	String title,

	@Schema(name = "숏폼 썸네일 경로")
	String thumbnailUrl,

	@Schema(name = "조회 수")
	Long viewCount,

	@Schema(name = "언론사 이름")
	String pressName,

	@Schema(name = "시청 시간")
	LocalDateTime viewTime

) {

	public static HistoryDto of(History history) {
		return HistoryDto.builder()
				.id(history.getArticle().getArticleId())
				.title(history.getArticle().getTitle())
				.thumbnailUrl(history.getArticle().getThumbnailUrl())
				.viewCount(history.getArticle().getViewCount())
				.pressName(history.getArticle().getPress().getPressBranding().getName())
				.viewTime(history.getUpdatedAt())
			.build();
	}

}
