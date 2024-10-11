package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.member.model.entity.Member;
import java.util.List;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.HistoryDto;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import java.util.Optional;

public interface HistoryService {

	void createHistory(Member member, Article article);

	Optional<History> getLatestHistoryByMember(Member member);

	SlicedResponse<List<HistoryDto>> getHistories(CustomUserDetails userDetails, int page);

}
