package com.a301.newsseug.domain.folder.service;

import com.a301.newsseug.domain.article.model.dto.response.GetArticleResponse;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.bookmark.repository.BookmarkRepository;
import com.a301.newsseug.domain.folder.exception.InaccessibleFolderException;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.CreateFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderDetailsResponse;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivateStatus;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    public GetFolderDetailsResponse getFolder(CustomUserDetails userDetails, Long folderId) {

        Member loginMember = userDetails.getMember();
        Folder folder = folderRepository.findByFolderIdAndMemberAndStatus(folderId, loginMember, ActivateStatus.ACTIVE)
                .orElseThrow(InaccessibleFolderException::new);

        List<Bookmark> bookmarks = bookmarkRepository.findAllByFolder(folder);

        return GetFolderDetailsResponse.of(
                folder,
                GetArticleResponse.fromBookmark(bookmarks)
                );

    }

    @Override
    public List<GetFolderResponse> getFoldersByMember(CustomUserDetails userDetails) {

        Member loginMember = userDetails.getMember();
        List<Folder> folders = folderRepository.findAllByMember(loginMember);
        Map<Folder, List<Bookmark>> foldersWithBookmark = getBookmarkFromFolder(folders);

        return GetFolderResponse.of(foldersWithBookmark);

    }

    private Map<Folder, List<Bookmark>> getBookmarkFromFolder(List<Folder> folders) {

        Map<Folder, List<Bookmark>> foldersWithBookmark = new HashMap<>();

        for (Folder folder : folders) {
            List<Bookmark> bookmarks = bookmarkRepository.findAllByFolder(folder);
            foldersWithBookmark.put(folder, bookmarks);
        }

        return foldersWithBookmark;

    }

    @Override
    public CreateFolderResponse createFolder(CustomUserDetails userDetails, String title) {

        Member loginMember = userDetails.getMember();

        return CreateFolderResponse.of(
                folderRepository.save(
                        Folder.builder()
                                .member(loginMember)
                                .title(title)
                                .build()
        ));

    }

}
