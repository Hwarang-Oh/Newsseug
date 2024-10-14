package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.member.model.entity.Member;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.GetHistoryResponse;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import java.util.List;
import java.util.Optional;

public interface HistoryService {

	void createHistory(Member member, Article article);

	Optional<History> getLatestHistoryByMember(Member member);

	SlicedResponse<List<GetHistoryResponse>> getHistories(CustomUserDetails userDetails, int page);

}
