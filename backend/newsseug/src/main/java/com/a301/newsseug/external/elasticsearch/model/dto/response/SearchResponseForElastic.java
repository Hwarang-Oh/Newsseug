package com.a301.newsseug.external.elasticsearch.model.dto.response;

import com.a301.newsseug.external.elasticsearch.model.document.PressAndArticleDocument;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.AccessLevel;
import lombok.Builder;

@JsonInclude(Include.NON_NULL)
@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "검색 응답", description = "검색 결과")
public record SearchResponseForElastic(

        @Schema(description = "검색 결과 종류", examples = {"article", "press"})
        String type,

        @Schema(description = "식별자")
        Long id,

        @Schema(description = "언론사 이름")
        String name,

        @Schema(description = "언론사 이미지")
        String imageUrl,

        @Schema(description = "언론사 설명")
        String description,

        @Schema(description = "언론사 구독자수")
        Long subscribeCount,

        @Schema(description = "언론사 구독 여부")
        Boolean isSubscribed,

        @Schema(description = "기사 발행 언론사 이름", examples = {"조선일보"})
        String pressName,

        @Schema(description = "썸네일", examples = {"https://{bucket-name}~amazonaws.com/{directory-name}/{thumbnail-url}"})
        String thumbnailUrl,

        @Schema(description = "기사 제목", examples = {"오늘밤 최대 150㎜ 퍼붓는다 남부·동해안 '뒤끝 폭우' 고비"})
        String title,

        @Schema(description = "조회수", examples = {"150"})
        Long viewCount,

        @Schema(description = "생성일", examples = {"20240423"})
        LocalDateTime createdAt

) {

        public static SearchResponseForElastic of(PressAndArticleDocument document) {
                SearchResponseForElasticBuilder baseBuidler = SearchResponseForElastic.builder()
                        .type(document.getType())
                        .id(document.getPress().getId());

                switch (document.getType()) {
                        case "press" -> {
                                return baseBuidler
                                        .name(document.getPress().getName())
                                        .imageUrl(document.getPress().getImageUrl())
                                        .description(document.getPress().getDescription())
                                        .subscribeCount(100L)
                                        .isSubscribed(Boolean.FALSE)
                                        .build();
                        }
                        default -> {
                                return baseBuidler
                                        .thumbnailUrl(document.getArticle().getThumbnailUrl())
                                        .title(document.getArticle().getTitle())
                                        .viewCount(document.getArticle().getViewCount())
                                        .createdAt(document.getArticle().getCreatedAt())
                                        .build();
                        }
                }
        }

        public static SearchResponseForElastic of(PressAndArticleDocument document, Set<Long> pressIds) {
                SearchResponseForElasticBuilder baseBuidler = SearchResponseForElastic.builder()
                        .type(document.getType())
                        .id(document.getPress().getId());

                switch (document.getType()) {
                        case "press" -> {
                                return baseBuidler
                                        .name(document.getPress().getName())
                                        .imageUrl(document.getPress().getImageUrl())
                                        .description(document.getPress().getDescription())
                                        .subscribeCount(100L)
                                        .isSubscribed(pressIds.contains(document.getPress().getId()))
                                        .build();
                        }
                        default -> {
                                return baseBuidler
                                        .thumbnailUrl(document.getArticle().getThumbnailUrl())
                                        .title(document.getArticle().getTitle())
                                        .viewCount(document.getArticle().getViewCount())
                                        .createdAt(document.getArticle().getCreatedAt())
                                        .build();
                        }
                }
        }

        public static List<SearchResponseForElastic> of(List<PressAndArticleDocument> documents) {
                return documents.stream()
                        .map(SearchResponseForElastic::of)
                        .toList();
        }

        public static List<SearchResponseForElastic> of(List<PressAndArticleDocument> documents, Set<Long> pressIds) {
                return documents.stream()
                        .map(document -> SearchResponseForElastic.of(document, pressIds))
                        .toList();
        }

}
