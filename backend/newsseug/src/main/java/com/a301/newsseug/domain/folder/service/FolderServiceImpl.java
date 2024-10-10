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
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import com.a301.newsseug.global.model.entity.SliceDetails;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class FolderServiceImpl implements FolderService {

    private final FolderRepository folderRepository;
    private final BookmarkRepository bookmarkRepository;

    @Override
    @Transactional(readOnly = true)
    public GetFolderDetailsResponse getFolder(CustomUserDetails userDetails, int pageNumber, Long folderId) {

        Member loginMember = userDetails.getMember();
        Folder folder = folderRepository.findByFolderIdAndMemberAndActivationStatus(folderId, loginMember, ActivationStatus.ACTIVE)
                .orElseThrow(InaccessibleFolderException::new);

        Pageable pageable = PageRequest.of(
                pageNumber,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );
        Slice<Bookmark> bookmarks = bookmarkRepository.findAllByFolderWithSlice(folder, pageable);

        return GetFolderDetailsResponse.of(
                folder,
                SlicedResponse.of(
                        SliceDetails.of(bookmarks.getNumber(), bookmarks.isFirst(), bookmarks.hasNext()),
                        GetArticleResponse.fromBookmark(bookmarks.getContent())
                )
        );

    }

    @Override
    @Transactional(readOnly = true)
    public List<GetFolderResponse> getFolders(CustomUserDetails userDetails) {

        Member loginMember = userDetails.getMember();
        List<Folder> folders = folderRepository.findAllByMemberAndActivationStatus(loginMember, ActivationStatus.ACTIVE);
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
