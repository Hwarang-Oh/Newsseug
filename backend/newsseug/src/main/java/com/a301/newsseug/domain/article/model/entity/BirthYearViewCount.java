package com.a301.newsseug.domain.article.model.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "birth_year_view_counts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BirthYearViewCount {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "birth_year_view_counts_seq")
    @SequenceGenerator(name = "birth_year_view_counts_seq", sequenceName = "birth_year_view_counts_seq", allocationSize = 1)
    Long birthViewCountId;

    @Column
    private Integer birthYear;

    @Column(nullable = false)
    private Long viewCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    public void view() {
        this.viewCount++;
    }

    @Builder
    public BirthYearViewCount(Integer birthYear, Article article) {
        this.birthYear = birthYear;
        this.article = article;
        this.viewCount = 0L;
    }
}
