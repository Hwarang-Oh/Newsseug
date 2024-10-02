package com.a301.newsseug.domain.interaction.service;

import java.util.List;

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

@Service
@RequiredArgsConstructor
public class HistoryServiceImpl implements HistoryService {

	private final HistoryRepository historyRepository;

	private static final int PAGE_SIZE = 10;

	@Override
	public SlicedResponse<List<HistoryDto>> getHistories(CustomUserDetails userDetails, int page) {

		Member member = userDetails.getMember();

		Pageable pageable = PageRequest.of(page, PAGE_SIZE, Sort.by("updatedAt"));

		Slice<History> historyPage = historyRepository.findAllByMember(member, pageable);

		SliceDetails sliceDetails = SliceDetails.of(historyPage.getNumber(), historyPage.isFirst(), historyPage.hasNext());

		return SlicedResponse.of(sliceDetails, historyPage.map(HistoryDto::of).toList());
	}
}
