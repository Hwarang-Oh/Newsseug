package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.entity.Article;

import com.a301.newsseug.global.enums.*;
import com.a301.newsseug.domain.article.repository.ArticlePressCustomRepository;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.SliceDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class ArticlePressService {

    private final ArticlePressCustomRepository articlePressCustomRepository;
    private final PressRepository pressRepository;

    @Transactional(readOnly = true)
    public SlicedResponse<List<GetArticleResponse>> getArticlesByPress(
            Long pressId, int pageNumber, String category, String criteria) {

        Press press = pressRepository.getOrThrow(pressId);

        Pageable pageable = PageRequest.of(
                pageNumber,
                20,
                Sort.by(Direction.DESC, SortingCriteria.convertToEnum(criteria.toUpperCase()).getValue()
                )
        );

        Slice<Article> sliced = articlePressCustomRepository.findAllByPressAndCategory(
                press, category, pageable
        );

        return SlicedResponse.of(
                SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
                GetArticleResponse.of(sliced.getContent())
        );

    }

}
