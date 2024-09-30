package com.a301.newsseug.domain.folder.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
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
import com.a301.newsseug.global.model.entity.ActivateStatus;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@DisplayName("폴더 관련 기능")
@ExtendWith(MockitoExtension.class)
class FolderServiceTest {

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
        given(folderRepository.findByFolderIdAndMemberAndStatus(folder.getFolderId(), loginMember, ActivateStatus.ACTIVE))
                .willReturn(Optional.of(folder));

        given(bookmarkRepository.findAllByFolder(folder)).willReturn(Collections.emptyList());

        // When
        GetFolderDetailsResponse response = folderService.getFolder(userDetails, folder.getFolderId());

        // Then
        verify(folderRepository).findByFolderIdAndMemberAndStatus(folder.getFolderId(), loginMember, ActivateStatus.ACTIVE);
        verify(bookmarkRepository).findAllByFolder(folder);

        assertThat(folder.getFolderId()).isEqualTo(response.id());
        assertThat(folder.getTitle()).isEqualTo(response.title());
        assertThat(response.articles().isEmpty()).isTrue();

    }

    @Test
    @DisplayName("폴더 조회[실패 - 소유자가 아님]")
    void getFolderInaccessibleFolder() {

        // Given
        when(folderRepository.findByFolderIdAndMemberAndStatus(folder.getFolderId(), loginMember, ActivateStatus.ACTIVE))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> folderService.getFolder(userDetails, folder.getFolderId()))
                .isInstanceOf(InaccessibleFolderException.class);

    }


    @Test
    @DisplayName("목록 조회[성공]")
    void getFolderByMember() {

        // Given
        List<Folder> folders = List.of(FolderFactory.folder(1L), FolderFactory.folder(2L));
        given(folderRepository.findAllByMember(loginMember)).willReturn(folders);
        given(bookmarkRepository.findAllByFolder(folders.get(0))).willReturn(List.of());
        given(bookmarkRepository.findAllByFolder(folders.get(1))).willReturn(List.of());

        // When
        List<GetFolderResponse> response = folderService.getFoldersByMember(userDetails);

        // Then
        verify(folderRepository).findAllByMember(loginMember);
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
