package com.a301.newsseug.domain.bookmark.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.model.dto.request.CreateBookmarkRequest;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.bookmark.repository.BookmarkRepository;
import com.a301.newsseug.domain.folder.exception.InaccessibleFolderException;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final FolderRepository folderRepository;
    private final ArticleRepository articleRepository;

    @Override
    public void createBookmark(CustomUserDetails userDetails, CreateBookmarkRequest request) {

        Member loginMember = userDetails.getMember();
        Article article = articleRepository.getOrThrow(request.articleId());
        List<Folder> folders = getFolderFromFolderId(request.folderIds(), loginMember, article);

        List<Bookmark> bookmarks = folders.stream()
                .map(folder -> {

                    Bookmark bookmark = Bookmark.builder()
                            .folder(folder)
                            .article(article)
                            .build();

                    folder.incrementArticleCount();

                    return bookmark;

                }).toList();

        bookmarkRepository.saveAll(bookmarks);

    }

    private List<Folder> getFolderFromFolderId(List<Long> folderIds, Member loginMember, Article article) {

        List<Folder> folders = new ArrayList<>();

        for (Long id : folderIds) {
            Folder folder = folderRepository
                    .findByFolderIdAndMemberAndActivationStatus(id, loginMember, ActivationStatus.ACTIVE)
                    .orElseThrow(InaccessibleFolderException::new);

            folder.setThumbnailUrl(article.getThumbnailUrl());
            folders.add(folder);
        }

        return folders;

    }

}
