package com.a301.newsseug.domain.article.model.entity;

import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import com.a301.newsseug.domain.article.model.entity.type.ConversionStatus;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Getter
@Entity
@Table(name = "articles")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long articleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "press_id", nullable = false)
    private Press press;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String sourceUrl;

    @Column(nullable = true)
    private String contentUrl;

    @Column(nullable = true)
    private String videoUrl;

    @Column(nullable = true)
    private String thumbnailUrl;

    @Column(nullable = false)
    private Long viewCount;

    @Column(nullable = false)
    private Long likeCount;

    @Column(nullable = false)
    private Long hateCount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ConversionStatus conversionStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryType category;

    @Builder
    public Article(
            Press press, String title, String sourceUrl, String contentUrl, String videoUrl, String thumbnailUrl, CategoryType category) {
        this.press = press;
        this.title = title;
        this.sourceUrl = sourceUrl;
        this.contentUrl = contentUrl;
        this.videoUrl = videoUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.viewCount = 0L;
        this.likeCount = 0L;
        this.hateCount = 0L;
        this.category = category;
    }
}