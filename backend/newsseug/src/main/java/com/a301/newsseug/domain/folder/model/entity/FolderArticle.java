package com.a301.newsseug.domain.folder.model.entity;

import com.a301.newsseug.domain.article.model.entity.Article;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@Table(name = "folder_article_info")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FolderArticle {

    @Id
    @Column(name = "folder_article_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;

    @ManyToOne
    @JoinColumn(name = "folder_id")
    private Folder folder;

}
