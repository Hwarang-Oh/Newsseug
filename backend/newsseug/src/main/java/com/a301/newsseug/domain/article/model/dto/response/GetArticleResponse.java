package com.a301.newsseug.domain.article.model.dto.response;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AccessLevel;
import lombok.Builder;

@Builder(access = AccessLevel.PRIVATE)
@Schema(name = "기사 정보", description = "기사 목록 조회시 노출할 기사 정보")
public record GetArticleResponse(

        @Schema(description = "식별자", examples = {"99"})
        Long id,

        @Schema(description = "언론사 이름", examples = {"조선일보"})
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

        public static GetArticleResponse of(Article article) {
                return GetArticleResponse.builder()
                        .id(article.getArticleId())
                        .pressName(article.getPress().getPressBranding().getName())
                        .thumbnailUrl(article.getThumbnailUrl())
                        .title(article.getTitle())
                        .viewCount(article.getViewCount())
                        .createdAt(article.getCreatedAt())
                        .build();
        }

        public static List<GetArticleResponse> of(List<Article> articles) {
                return articles.stream()
                        .map(GetArticleResponse::of)
                        .toList();
        }

        public static List<GetArticleResponse> fromBookmark(List<Bookmark> bookmarks) {
                return bookmarks.stream()
                        .map(bookmark -> GetArticleResponse.of(bookmark.getArticle()))
                        .toList();
        }

}
