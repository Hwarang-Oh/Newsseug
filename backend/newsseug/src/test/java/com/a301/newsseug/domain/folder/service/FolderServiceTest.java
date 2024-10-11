package com.a301.newsseug.domain.folder.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.factory.entity.BookmarkFactory;
import com.a301.newsseug.domain.bookmark.model.entity.Bookmark;
import com.a301.newsseug.domain.bookmark.repository.BookmarkRepository;
import com.a301.newsseug.domain.folder.exception.InaccessibleFolderException;
import com.a301.newsseug.domain.folder.factory.entity.FolderFactory;
import com.a301.newsseug.domain.folder.factory.fixtures.FolderFixtures;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.CreateFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderDetailsResponse;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;

@DisplayName("폴더 관련 기능")
@ExtendWith(MockitoExtension.class)
class FolderServiceTest {

    private static final int PAGE_NUMBER =  0;

    @Mock
    private FolderRepository folderRepository;

    @Mock
    private BookmarkRepository bookmarkRepository;

    @Mock
    private CustomUserDetails userDetails;

    @InjectMocks
    private FolderServiceImpl folderService;

    private Member loginMember;
    private Folder folder;

    @BeforeEach
    void beforeEach() {

        loginMember = MemberFactory.memberOfKakao(1L);
        folder = FolderFactory.folder(1L);
        given(userDetails.getMember()).willReturn(loginMember);

    }

    @Test
    @DisplayName("폴더 조회[성공]")
    void getFolder() {

        // Given
        Pageable pageable = PageRequest.of(
                PAGE_NUMBER,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getField())
        );

        Slice<Bookmark> bookmarks = new SliceImpl<>(
                List.of(BookmarkFactory
                        .bookmark(
                                1L, 1L, 1L
                        )),
                pageable,
                false
        );

        given(folderRepository.findByFolderIdAndMemberAndActivationStatus(folder.getFolderId(), loginMember, ActivationStatus.ACTIVE))
                .willReturn(Optional.of(folder));

        given(bookmarkRepository.findAllByFolderWithSlice(folder, pageable)).willReturn(bookmarks);

        // When
        GetFolderDetailsResponse response = folderService.getFolder(userDetails, 0, folder.getFolderId());

        // Then
        verify(folderRepository).findByFolderIdAndMemberAndActivationStatus(folder.getFolderId(), loginMember, ActivationStatus.ACTIVE);
        verify(bookmarkRepository).findAllByFolderWithSlice(folder, pageable);

        assertThat(folder.getFolderId()).isEqualTo(response.id());
        assertThat(folder.getTitle()).isEqualTo(response.title());
        assertThat(response.articles().getContent().isEmpty()).isFalse();

    }

    @Test
    @DisplayName("폴더 조회[실패 - 소유자가 아님]")
    void getFolderInaccessibleFolder() {

        // Given
        when(folderRepository.findByFolderIdAndMemberAndActivationStatus(folder.getFolderId(), loginMember, ActivationStatus.ACTIVE))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> folderService.getFolder(userDetails, PAGE_NUMBER, folder.getFolderId()))
                .isInstanceOf(InaccessibleFolderException.class);

    }


    @Test
    @DisplayName("목록 조회[성공]")
    void getFolderByMember() {

        // Given
        List<Folder> folders = List.of(FolderFactory.folder(1L), FolderFactory.folder(2L));
        given(folderRepository.findAllByMemberAndActivationStatus(loginMember, ActivationStatus.ACTIVE)).willReturn(folders);
        given(bookmarkRepository.findAllByFolder(folders.get(0))).willReturn(List.of());
        given(bookmarkRepository.findAllByFolder(folders.get(1))).willReturn(List.of());

        // When
        List<GetFolderResponse> response = folderService.getFolders(userDetails);

        // Then
        verify(folderRepository).findAllByMemberAndActivationStatus(loginMember, ActivationStatus.ACTIVE);
        verify(bookmarkRepository).findAllByFolder(folders.get(0));
        verify(bookmarkRepository).findAllByFolder(folders.get(1));

        assertThat(response).hasSize(2);
        assertThat(response)
                .extracting(GetFolderResponse::id, GetFolderResponse::title, GetFolderResponse::articles)
                .containsExactlyInAnyOrder(
                        tuple(1L, FolderFixtures.title, List.of()),
                        tuple(2L, FolderFixtures.title, List.of())
                );

    }

    @Test
    @DisplayName("폴더 생성[성공]")
    void createFolder() {

        // Given
        given(folderRepository.save(any(Folder.class))).willReturn(folder);

        // When
        CreateFolderResponse response = folderService.createFolder(userDetails, FolderFixtures.title);

        // Then
        verify(folderRepository).save(any(Folder.class));
        assertThat(response.id()).isEqualTo(folder.getFolderId());
        assertThat(response.title()).isEqualTo(folder.getTitle());
        assertThat(response.thumbnailUrl()).isEqualTo(folder.getThumbnailUrl());
        assertThat(response.articleCount()).isEqualTo(folder.getArticleCount());

    }

}
