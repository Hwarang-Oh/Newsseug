package com.a301.newsseug.domain.bookmark.factory.entity;

import com.a301.newsseug.domain.article.factory.ArticleFactory;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.folder.factory.entity.FolderFactory;
import org.springframework.test.util.ReflectionTestUtils;

public class BookmarkFactory {

    public static Bookmark bookmark(
            Long bookmarkId, Long folderId, Long articleId
    ) {

        Bookmark bookmark = Bookmark.builder()
                .folder(FolderFactory.folder(folderId))
                .article(ArticleFactory.article(articleId))
                .build();

        ReflectionTestUtils.setField(bookmark, "bookmarkId", bookmarkId);

        return bookmark;

    }

}
