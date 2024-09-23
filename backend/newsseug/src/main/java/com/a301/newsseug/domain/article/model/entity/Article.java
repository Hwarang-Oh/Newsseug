package com.a301.newsseug.domain.article.model.entity;

import com.a301.newsseug.domain.article.model.entity.type.Category;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.global.model.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * CREATE TABLE `articles` (
 * 	`article_id`	BIGINT	NOT NULL,
 * 	`press_id`	BIGINT	NOT NULL,
 * 	`title`	VARCHAR	NOT NULL,
 * 	`source`	VARCHAR(255)	NOT NULL,
 * 	`content_url`	VARCHAR(255)	NOT NULL,
 * 	`video_url`	VARCHAR(255)	NOT NULL,
 * 	`view_count`	BIGINT	NOT NULL	DEFAULT 0,
 * 	`category`	ENUM(POLITICS, ECONOMY, DIPLOMACY, INCIDENTS, SCIENCE)	NOT NULL
 * 	`created_at`	TIMESTAMP	NOT NULL,
 * 	`updated_at`	TIMESTAMP	NOT NULL
 * );
 */
@Getter
@Entity
@Table(name = "articles")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Article extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long articleId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String source; // 출처 URL

    @Column(nullable = false)
    private String contentUrl; // 원문 URL

    @Column(nullable = false)
    private String videoUrl; // 영상 URL

    @Column(nullable = false)
    private String thumbnailUrl; // 썸네일 URL

    @Column(nullable = false)
    private Long viewCount = 0L;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "press_id", nullable = false)
    private Press press;

    @Builder
    public Article(String title, String source, String contentUrl, String videoUrl, String thumbnailUrl, Category category) {
        this.title = title;
        this.source = source;
        this.contentUrl = contentUrl;
        this.videoUrl = videoUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.viewCount = 0L;
        this.category = category;
    }
}
