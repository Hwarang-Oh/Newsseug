package com.a301.newsseug.domain.article.service;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.dto.response.*;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.SimpleHateDto;
import com.a301.newsseug.domain.interaction.model.dto.SimpleLikeDto;
import com.a301.newsseug.domain.interaction.repository.HateRepository;
import com.a301.newsseug.domain.interaction.repository.LikeRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.external.redis.config.CountProperties;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.SliceDetails;
import com.a301.newsseug.global.util.ClockUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
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
    private final RedisCountService redisCountService;
    private final CountProperties countProperties;

    @Override
    public GetArticleDetailsResponse getArticleDetail(CustomUserDetails userDetails, Long articleId) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(articleId);

        String viewCountHashKey = "article:viewcount";
        Long incrementValue = 1L;

        Long currentViewCount = redisCountService.increment(viewCountHashKey, articleId, incrementValue);

        // 현재 조회수가 임계치에 도달했을 경우 DB에 업데이트 후 Redis에서 초기화
        if (currentViewCount >= countProperties.getThreshold()) {
            articleRepository.updateCount("viewCount", articleId, currentViewCount);
            redisCountService.deleteByKey(viewCountHashKey, articleId);
        }

        String likeCountHashKey = "article:likecount";
        Long likeCount = redisCountService.findByKey(likeCountHashKey, articleId)
                .orElse(article.getLikeCount());

        String hateCountHashKey = "article:hatecount";
        Long hateCount = redisCountService.findByKey(hateCountHashKey, articleId)
                .orElse(article.getHateCount());

        if (Objects.isNull(loginMember)) {
            return GetArticleDetailsResponse.of(
                    article,
                    currentViewCount,
                    false,
                    SimpleLikeDto.of(false, likeCount),
                    SimpleHateDto.of(false, hateCount)
            );
        }

        return GetArticleDetailsResponse.of(article,
                currentViewCount,
                subscribeRepository.existsByMemberAndPress(loginMember, article.getPress()),
                SimpleLikeDto.of(
                        likeRepository.existsByMemberAndArticle(loginMember, article),
                        likeCount
                ),
                SimpleHateDto.of(
                        hateRepository.existsByMemberAndArticle(loginMember, article),
                        hateCount
                )
        );

    }

    @Override
    public SlicedResponse<List<GetArticleResponse>> getTodayArticleListByCategory(String category, int pageNumber) {

        Pageable pageable = PageRequest.of(
                pageNumber,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );
        LocalDateTime startOfDay = ClockUtil.getLocalDateTime().toLocalDate().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);

        Slice<Article> sliced = articleRepository.findAllByCategoryAndCreatedAtBetween(category, startOfDay, endOfDay, pageable);

        return SlicedResponse.of(
                SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
                GetArticleResponse.of(sliced.getContent())
        );

    }

    @Override
    public SlicedResponse<List<GetArticleResponse>> getArticleListByCategory(String category, int pageNumber) {

        Pageable pageable = PageRequest.of(
                pageNumber,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );
        Slice<Article> sliced = articleRepository.findAllByCategory(category, pageable);

        List<GetArticleResponse> articles = GetArticleResponse.of(sliced.getContent());

        SliceDetails sliceDetails = SliceDetails.of(
                sliced.getNumber(),
                sliced.isFirst(),
                sliced.hasNext()
        );

        return SlicedResponse.of(sliceDetails, articles);

    }

    @Override
    @Transactional(readOnly = true)
    public SlicedResponse<List<GetArticleResponse>> getArticlesByPress(
            CustomUserDetails userDetails, Long pressId, int pageNumber, String category
    ) {

        Member loginMember = userDetails.getMember();
        Pageable pageable = PageRequest.of(
                pageNumber,
                20,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );

        Slice<Article> sliced;
        if (Objects.nonNull(pressId)) {
            sliced = articleRepository.findAllByPressAndCategory(
                    pressRepository.getOrThrow(pressId) , category, pageable
            );
        } else {
            sliced = articleRepository.findByPress(
                    subscribeRepository.findPressByMember(loginMember), category, pageable
            );
        }

        return SlicedResponse.of(
                SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
                GetArticleResponse.of(sliced.getContent())
        );

    }

}
