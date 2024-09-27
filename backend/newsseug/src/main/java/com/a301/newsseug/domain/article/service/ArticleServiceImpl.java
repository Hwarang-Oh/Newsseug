package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleCustomRepository;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.SimpleHateDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleLikeDto;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.SliceDetails;
import com.a301.newsseug.global.util.ClockUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final PressRepository pressRepository;
    private final LikeRepository likeRepository;
    private final HateRepository hateRepository;
    private final SubscribeRepository subscribeRepository;

    @Override
    public SlicedResponse<List<GetArticleResponse>> getTodayArticleListByCategory(String category, int pageNumber) {
        PageRequest pageRequest = PageRequest.of(pageNumber, 10);
        Slice<Article> articlesPage = null;

        LocalDateTime startOfDay = ClockUtil.getLocalDateTime().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);

        if (Objects.isNull(category)) {

//            articlesPage = articleRepository.findByCreatedAtBetweenAndCategory(startOfDay, endOfDay, categoryType, pageRequest);
        } else {
            articlesPage = articleRepository.findByCreatedAtBetween(startOfDay, endOfDay, pageRequest);
        }

        List<GetArticleResponse> articles = GetArticleResponse.of(articlesPage.getContent());

        SliceDetails sliceDetails = SliceDetails.of(
                articlesPage.getNumber(),
                articlesPage.isFirst(),
                articlesPage.hasNext()
        );

        return SlicedResponse.of(sliceDetails, articles);
    }

    @Override
    public SlicedResponse<List<GetArticleResponse>> getArticleListByCategory(String category, int pageNumber) {

        PageRequest pageRequest = PageRequest.of(pageNumber, 10);
        Slice<Article> articlesPage = null;

        if (!"ALL".equalsIgnoreCase(category)) {
//            articlesPage = articleRepository.findByCategoryOrderByCreatedAtDesc(categoryType, pageRequest);
        } else {
            articlesPage = articleRepository.findAllByOrderByCreatedAtDesc(pageRequest);
        }

        List<GetArticleResponse> articles = GetArticleResponse.of(articlesPage.getContent());

        SliceDetails sliceDetails = SliceDetails.of(
                articlesPage.getNumber(),   // Current page number
                articlesPage.isFirst(),     // Whether it's the first slice
                articlesPage.hasNext()      // Whether there's a next slice
        );

        return SlicedResponse.of(sliceDetails, articles);
    }

    @Transactional(readOnly = true)
    public SlicedResponse<List<GetArticleResponse>> getArticlesByPress(
            Long pressId, int pageNumber, String category, String criteria) {

        Press press = pressRepository.getOrThrow(pressId);

        Pageable pageable = PageRequest.of(
                pageNumber,
                20,
                Sort.by(Sort.Direction.DESC, SortingCriteria.convertToEnum(criteria.toUpperCase()).getValue()
                )
        );

        Slice<Article> sliced = articleRepository.findAllByPressAndCategory(
                press, category, pageable
        );

        return SlicedResponse.of(
                SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
                GetArticleResponse.of(sliced.getContent())
        );

    }

    @Override
    @Transactional(readOnly = true)
    public GetArticleDetailsResponse getArticleDetail(CustomUserDetails userDetails, Long articleId) {

        Article article = articleRepository.getOrThrow(articleId);
        Press press = article.getPress();

        Boolean isSubscribe = false;
        Boolean isLike = false;
        Integer likeCount = likeRepository.countByArticle(article);
        Boolean isHate = false;
        Integer hateCount = hateRepository.countByArticle(article);

        if (!Objects.isNull(userDetails)) {
            Member loginMember = userDetails.getMember();

            isSubscribe = subscribeRepository.existsByMemberAndPress(loginMember, press);
            isLike = likeRepository.existsByMemberAndArticle(loginMember, article);
            isHate = hateRepository.existsByMemberAndArticle(loginMember, article);
        }

        return GetArticleDetailsResponse.of(article,
                isSubscribe,
                SimpleLikeDto.of(isLike, likeCount),
                SimpleHateDto.of(isHate, hateCount));
    }

//    @Override
//    @Transactional(readOnly = true)
//    public SlicedResponse<List<GetArticleDetailsResponse>> getArticleDetailList(CustomUserDetails userDetails, int page) {
//
//        Member loginMember = userDetails.getMember();
//
//        PageRequest pageRequest = PageRequest.of(page, 10);
//        Slice<Article> articlesPage = articleRepository.findAll(pageRequest);
//
//        List<GetArticleDetailsResponse> articles = articlesPage.getContent().stream()
//                .map(article -> {
//                    Press press = article.getPress();
//                    Boolean isSubscribe = subscribeRepository.existsByMemberAndPress(loginMember, article.getPress());
//                    Boolean isLike = likeRepository.existsByMemberAndArticle(loginMember, article);
//                    Integer likeCount = likeRepository.countByArticle(article);
//                    Boolean isHate = hateRepository.existsByMemberAndArticle(loginMember, article);
//                    Integer hateCount = hateRepository.countByArticle(article);
//
//                    return GetArticleDetailsResponse.of(
//                            article,
//                            subscribeRepository.existsByMemberAndPress(loginMember, article.getPress()),
//                            SimpleLikeDto.of(isLike, likeCount),
//                            SimpleHateDto.of(isHate, hateCount)
//                    );
//                })
//                .toList();
//
//        SliceDetails sliceDetails = SliceDetails.of(
//                articlesPage.getNumber(),
//                articlesPage.isFirst(),
//                articlesPage.hasNext()
//        );
//
//        return SlicedResponse.of(sliceDetails, articles);
//
//    }

}
