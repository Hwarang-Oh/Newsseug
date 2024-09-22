package com.a301.newsseug.domain.article.model.entity;

import com.a301.newsseug.domain.article.model.entity.type.ReportType;
import com.a301.newsseug.global.util.ClockUtil;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "reports")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long reportId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportType type;

    @CreatedDate
    @Column(updatable = false, columnDefinition = "TIMESTAMP")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onPrePersist() {
        this.createdAt = ClockUtil.getLocalDateTime();
    }
}
