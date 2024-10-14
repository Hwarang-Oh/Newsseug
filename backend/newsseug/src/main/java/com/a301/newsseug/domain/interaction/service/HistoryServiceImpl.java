package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import jakarta.transaction.Transactional;

import java.util.Optional;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
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

		Optional<History> history = historyRepository.findByMemberAndArticleAndActivationStatus(
				member, article, ActivationStatus.ACTIVE
		);

		if (history.isPresent()){
			history.get().onPreUpdate();
			return;
		}

		historyRepository.save(
				History.builder()
						.member(member)
						.article(article)
						.build()
		);

	}

	@Override
	public Optional<History> getLatestHistoryByMember(Member member) {

		Pageable pageable = PageRequest.of(
				0,
				1,
				Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getField())
		);

		Page<History> paged = historyRepository.findAllByMember(member, pageable);

		if (paged.hasContent()) {
			return Optional.of(paged.getContent().get(0));
		}

		return Optional.empty();

	}

	@Override
	public SlicedResponse<Set<HistoryDto>> getHistories(CustomUserDetails userDetails, int page) {

		Pageable pageable = PageRequest.of(
				page,
				PAGE_SIZE,
				Sort.by(Direction.DESC, SortingCriteria.UPDATE_AT.getField())
		);

		Member member = userDetails.getMember();
		Slice<History> sliced = historyRepository.findAllByMemberOrderByUpdatedAt(member, pageable);

		return SlicedResponse.of(
				SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
				sliced.map(HistoryDto::of).toSet()
		);

	}

}
