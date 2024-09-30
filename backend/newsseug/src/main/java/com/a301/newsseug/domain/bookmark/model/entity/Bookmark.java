package com.a301.newsseug.domain.bookmark.model.entity;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(
        name = "bookmarks",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uniqueBookmark",
                        columnNames = {"article_id", "folder_id"}
                )
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long bookmarkId;

    @ManyToOne
    @JoinColumn(name = "article_id", nullable = false)
    private Article article;

    @ManyToOne
    @JoinColumn(name = "folder_id", nullable = false)
    private Folder folder;

    @Builder
    public Bookmark(Folder folder, Article article) {
        this.folder = folder;
        this.article = article;
    }

}
