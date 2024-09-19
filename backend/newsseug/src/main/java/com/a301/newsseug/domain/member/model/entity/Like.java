package com.a301.newsseug.domain.member.model.entity;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.global.util.ClockUtil;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "likes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long likeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @CreatedDate
    @Column(updatable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onPrePersist() {
        this.createdAt = ClockUtil.getLocalDateTime();
    }

}
