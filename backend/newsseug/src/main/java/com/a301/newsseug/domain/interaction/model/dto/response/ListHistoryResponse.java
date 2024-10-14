package com.a301.newsseug.domain.interaction.model.dto.response;

import java.util.List;

import com.a301.newsseug.domain.interaction.model.dto.GetHistoryResponse;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "사용자가 시청한 숏폼 목록")
public record ListHistoryResponse(

	@Schema(name = "숏폼 목록")
	List<GetHistoryResponse> histories

) {

	public static ListHistoryResponse of(List<GetHistoryResponse> histories) {
		return ListHistoryResponse.builder()
			.histories(histories)
			.build();
	}

}
