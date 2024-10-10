package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.global.enums.SortingCriteria;
import jakarta.transaction.Transactional;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.HistoryDto;
import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.interaction.repository.HistoryRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.SliceDetails;

import lombok.RequiredArgsConstructor;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

	private final HistoryRepository historyRepository;

	private static final int PAGE_SIZE = 10;


	@Override
	public void createHistory(Member member, Article article) {
		historyRepository.save(
				History.builder()
						.member(member)
						.article(article)
						.build()
		);
	}

	@Override
	public History getLatestHistoryByMember(Member member) {

		Pageable pageable = PageRequest.of(
				0,
				1,
				Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
		);

		Page<History> history = historyRepository.findByMember(member, pageable);
		return history.getContent().get(0);

	}

	@Override
	public SlicedResponse<List<HistoryDto>> getHistories(CustomUserDetails userDetails, int page) {

		Member member = userDetails.getMember();

//		Pageable pageable = PageRequest.of(page, PAGE_SIZE, Sort.by("updatedAt"));

		Pageable pageable = PageRequest.of(
				page, 
				PAGE_SIZE,
				Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
		);

		Slice<History> historyPage = historyRepository.findAllByMember(member, pageable);

		SliceDetails sliceDetails = SliceDetails.of(historyPage.getNumber(), historyPage.isFirst(), historyPage.hasNext());

		return SlicedResponse.of(sliceDetails, historyPage.map(HistoryDto::of).toList());

	}

}
