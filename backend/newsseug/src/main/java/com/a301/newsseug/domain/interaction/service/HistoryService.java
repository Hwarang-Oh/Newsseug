package com.a301.newsseug.domain.interaction.service;

import java.util.List;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.HistoryDto;
import com.a301.newsseug.global.model.dto.SlicedResponse;

public interface HistoryService {

	SlicedResponse<List<HistoryDto>> getHistories(CustomUserDetails userDetails, int page);

}
