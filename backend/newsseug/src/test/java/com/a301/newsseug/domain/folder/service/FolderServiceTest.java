package com.a301.newsseug.domain.folder.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.bookmark.repository.BookmarkRepository;
import com.a301.newsseug.domain.folder.exception.InaccessibleFolderException;
import com.a301.newsseug.domain.folder.factory.FolderFactory;
import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import com.a301.newsseug.domain.folder.model.dto.response.GetFolderResponse;
import com.a301.newsseug.domain.folder.model.dto.response.ListFolderResponse;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.factory.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivateStatus;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

@DisplayName("폴더 관련 기능")
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

        loginMember = MemberFactory.memberOfKakao();
        MockitoAnnotations.openMocks(this);
        given(userDetails.getMember()).willReturn(loginMember);

    }

    @Test
    @DisplayName("폴더 조회")
    void getFolder() {

        Folder folder = FolderFactory.folder(1L, "folder1");

        // Given
        given(folderRepository.findByIdAndMemberAndStatus(folder.getId(), loginMember, ActivateStatus.ACTIVE))
                .willReturn(Optional.of(folder));

        given(bookmarkRepository.findAllByFolder(folder)).willReturn(Collections.emptyList());

        // When
        GetFolderResponse response = folderService.getFolder(userDetails, folder.getId());

        // Then
        verify(folderRepository).findByIdAndMemberAndStatus(folder.getId(), loginMember, ActivateStatus.ACTIVE);
        verify(bookmarkRepository).findAllByFolder(folder);

        assertThat(folder.getId()).isEqualTo(response.id());
        assertThat(folder.getName()).isEqualTo(response.name());
        assertThat(response.articles().isEmpty()).isTrue();

    }

    @Test
    @DisplayName("폴더 조회[접근할 수 없는 폴더]")
    void getFolderInaccessibleFolder() {

        // Given
        Folder folder = FolderFactory.folder(1L, "folder1");
        when(userDetails.getMember()).thenReturn(loginMember);
        when(folderRepository.findByIdAndMemberAndStatus(folder.getId(), loginMember, ActivateStatus.ACTIVE))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> folderService.getFolder(userDetails, folder.getId()))
                .isInstanceOf(InaccessibleFolderException.class);

    }


    @Test
    @DisplayName("사용자 폴더 목록 조회")
    void getFolderByMember() {

        // Given
        given(folderRepository.findAllByMember(loginMember)).willReturn(
                List.of(
                        FolderFactory.folder(1L, "folder1"),
                        FolderFactory.folder(2L, "folder2")
                ));

        // When
        ListFolderResponse response = folderService.getFoldersByMember(userDetails);

        // Then
        verify(folderRepository).findAllByMember(loginMember);

        assertThat(response.folders()).hasSize(2);
        assertThat(response.folders())
                .extracting(FolderDto::id, FolderDto::name, FolderDto::articleCount)
                .containsExactlyInAnyOrder(
                        tuple(1L, "folder1", 0L),
                        tuple(2L, "folder2", 0L)
                );

    }

}
