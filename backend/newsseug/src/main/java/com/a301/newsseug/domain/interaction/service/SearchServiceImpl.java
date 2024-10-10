package com.a301.newsseug.domain.interaction.service;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.interaction.model.dto.response.SearchResponse;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.dto.response.GetPressDetailsResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.external.elasticsearch.model.document.PressAndArticleDocument;
import com.a301.newsseug.external.elasticsearch.model.dto.response.SearchResponseForElastic;
import com.a301.newsseug.external.elasticsearch.repository.PressAndArticleRepository;
import com.a301.newsseug.external.openfeign.client.EmbeddingServiceClient;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.SliceDetails;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final EmbeddingServiceClient embeddingServiceClient;
    private final ArticleRepository articleRepository;
    private final PressRepository pressRepository;
    private final SubscribeRepository subscribeRepository;
    private final PressAndArticleRepository pressAndArticleRepository;

    @Override
    public SearchResponse search(CustomUserDetails userDetails, String keyword, String filter, int pageNumber) {

        Pageable pageable = PageRequest.of(
                pageNumber,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );

        Slice<Article> articles = articleRepository.findAllByTitleIsContainingIgnoreCase(keyword, filter, pageable);
        List<Press> press = pressRepository.findAllByPressBranding_NameIsContainingIgnoreCase(keyword);

        if (userDetails.isEnabled()) {

            Set<Press> subscribedPress = new HashSet<>(
                    subscribeRepository.findAllByMember(userDetails.getMember()).stream()
                            .map(Subscribe::getPress)
                            .toList()
            );

            return SearchResponse.of(
                    GetPressDetailsResponse.of(press, subscribedPress),
                    SlicedResponse.of(
                            SliceDetails.of(articles.getNumber(), articles.isFirst(), articles.hasNext()),
                            GetArticleResponse.of(articles.getContent())
                    )
            );

        }

        return SearchResponse.of(
                GetPressDetailsResponse.of(press),
                SlicedResponse.of(
                        SliceDetails.of(articles.getNumber(), articles.isFirst(), articles.hasNext()),
                        GetArticleResponse.of(articles.getContent())
                )
        );

    }

    @Override
    public SlicedResponse<List<SearchResponseForElastic>> searchByElastic(CustomUserDetails userDetails, String keyword, int pageNumber) {

        Pageable pageable = PageRequest.of(
                pageNumber,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );

        float[] vector = embeddingServiceClient.getEmbeddingVector(keyword);
        Slice<PressAndArticleDocument> sliced = pressAndArticleRepository.searchByKeywordAndVector(keyword, vector, pageable);

        if (userDetails.isEnabled()) {
            Set<Long> pressIds = new HashSet<>(
                    subscribeRepository.findAllByMember(userDetails.getMember()).stream()
                            .map(subscribe -> subscribe.getPress().getPressId())
                            .toList()
            );

            return SlicedResponse.of(
                    SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
                    SearchResponseForElastic.of(sliced.getContent(), pressIds)
            );

        }

        return SlicedResponse.of(
                SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
                SearchResponseForElastic.of(sliced.getContent())
        );

    }

}
