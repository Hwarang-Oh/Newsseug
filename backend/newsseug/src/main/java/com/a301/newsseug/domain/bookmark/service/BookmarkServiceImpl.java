package com.a301.newsseug.domain.bookmark.service;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.repository.ArticleRepository;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.bookmark.repository.BookmarkRepository;
import com.a301.newsseug.domain.folder.exception.InaccessibleFolderException;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivateStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BookmarkServiceImpl implements BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final FolderRepository folderRepository;
    private final ArticleRepository articleRepository;

    @Override
    public void createBookmark(CustomUserDetails userDetails, Long folderId, Long articleId) {

        Member loginMember = userDetails.getMember();

        Folder folder = folderRepository.findByFolderIdAndMemberAndStatus(folderId, loginMember, ActivateStatus.ACTIVE)
                .orElseThrow(InaccessibleFolderException::new);

        Article article = articleRepository.getOrThrow(articleId);

        Bookmark bookmark = Bookmark.builder()
                .folder(folder)
                .article(article)
                .build();

        bookmarkRepository.save(bookmark);

    }

}
