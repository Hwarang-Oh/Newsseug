package com.a301.newsseug.domain.folder.service;

import com.a301.newsseug.domain.article.model.dto.SimpleArticleDto;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.bookmark.repository.BookmarkRepository;
import com.a301.newsseug.domain.folder.exception.InaccessibleFolderException;
import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.model.dto.response.ListFolderResponse;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivateStatus;
import java.util.List;
import java.util.stream.Collectors;
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
    public GetFolderResponse getFolder(CustomUserDetails userDetails, Long folderId) {

        Member loginMember = userDetails.getMember();
        Folder folder = folderRepository.findByFolderIdAndMemberAndStatus(folderId, loginMember, ActivateStatus.ACTIVE)
                .orElseThrow(InaccessibleFolderException::new);

        List<Bookmark> bookmarks = bookmarkRepository.findAllByFolder(folder);

        return GetFolderResponse.of(
                folderId,
                folder.getName(),
                SimpleArticleDto.fromBookmark(bookmarks)
                );

    }

    @Override
    public ListFolderResponse getFoldersByMember(CustomUserDetails userDetails) {

        Member loginMember = userDetails.getMember();
        List<Folder> folders = folderRepository.findAllByMember(loginMember);

        return ListFolderResponse.of(
                folders.stream()
                        .map(FolderDto::of)
                        .toList()
        );

    }

    @Override
    public void createFolder(CustomUserDetails userDetails, String name) {

        Member loginMember = userDetails.getMember();
        Folder folder = Folder.builder()
                .member(loginMember)
                .name(name)
                .build();

        folderRepository.save(folder);

    }

}
