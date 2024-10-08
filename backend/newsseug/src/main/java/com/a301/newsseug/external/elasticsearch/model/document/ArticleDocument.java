package com.a301.newsseug.external.elasticsearch.model.document;

import com.a301.newsseug.domain.article.model.entity.Article;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ArticleDocument {

    @Field(type = FieldType.Long)
    private Long id;

    @Field(type = FieldType.Text)
    private String pressName;

    @Field(type = FieldType.Text)
    private String thumbnailUrl;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Long)
    private Long viewCount;

    @Field(type = FieldType.Text)
    private LocalDateTime createdAt;

    public static ArticleDocument of(Article article) {
        return ArticleDocument.builder()
                .id(article.getArticleId())
                .pressName(article.getPress().getPressBranding().getName())
                .thumbnailUrl(article.getThumbnailUrl())
                .title(article.getTitle())
                .viewCount(article.getViewCount())
                .createdAt(article.getSourceCreatedAt())
                .build();
    }

}
