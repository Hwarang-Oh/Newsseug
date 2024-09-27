package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.response.ListHistoryResponse;
import com.a301.newsseug.global.model.dto.SlicedResponse;

public interface HistoryService {

	SlicedResponse<ListHistoryResponse> getHistories(CustomUserDetails userDetails, int page);

}
