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
import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.ListFolderResponse;
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

    @BeforeEach
    void beforeEach() {
        loginMember = MemberFactory.memberOfKakao(1L);
        given(userDetails.getMember()).willReturn(loginMember);
    }

    @Test
    @DisplayName("폴더 조회[성공]")
    void getFolder() {

        Folder folder = FolderFactory.folder(1L);

        // Given
        given(folderRepository.findByFolderIdAndMemberAndStatus(folder.getFolderId(), loginMember, ActivateStatus.ACTIVE))
                .willReturn(Optional.of(folder));

        given(bookmarkRepository.findAllByFolder(folder)).willReturn(Collections.emptyList());

        // When
        GetFolderResponse response = folderService.getFolder(userDetails, folder.getFolderId());

        // Then
        verify(folderRepository).findByFolderIdAndMemberAndStatus(folder.getFolderId(), loginMember, ActivateStatus.ACTIVE);
        verify(bookmarkRepository).findAllByFolder(folder);

        assertThat(folder.getFolderId()).isEqualTo(response.id());
        assertThat(folder.getName()).isEqualTo(response.name());
        assertThat(response.articles().isEmpty()).isTrue();

    }

    @Test
    @DisplayName("폴더 조회[실패 - 소유자가 아님]")
    void getFolderInaccessibleFolder() {

        // Given
        Folder folder = FolderFactory.folder(1L);
        when(userDetails.getMember()).thenReturn(loginMember);
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
        given(folderRepository.findAllByMember(loginMember)).willReturn(
                List.of(
                        FolderFactory.folder(1L),
                        FolderFactory.folder(2L)
                ));

        // When
        ListFolderResponse response = folderService.getFoldersByMember(userDetails);

        // Then
        verify(folderRepository).findAllByMember(loginMember);

        assertThat(response.folders()).hasSize(2);
        assertThat(response.folders())
                .extracting(FolderDto::id, FolderDto::name, FolderDto::articleCount)
                .containsExactlyInAnyOrder(
                        tuple(1L, FolderFixtures.name, 0L),
                        tuple(2L, FolderFixtures.name, 0L)
                );

    }

    @Test
    @DisplayName("폴더 생성 [성공]")
    void createFolder() {

        // Given
        Folder folder = FolderFactory.folder(1L);

        // When
        folderService.createFolder(userDetails, folder.getName());

        // Then
        verify(folderRepository).save(any(Folder.class));


    }

}
