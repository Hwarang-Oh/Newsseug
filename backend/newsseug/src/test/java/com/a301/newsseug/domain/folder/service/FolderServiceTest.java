package com.a301.newsseug.domain.folder.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.factory.FolderFactory;
import com.a301.newsseug.domain.folder.model.dto.FolderDto;
import com.a301.newsseug.domain.folder.model.response.FolderListResponse;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.factory.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import java.util.Arrays;
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
    private CustomUserDetails userDetails;

    @InjectMocks
    private FolderServiceImpl folderService;

    private Member member;

    @BeforeEach
    void setUp() {
        member = MemberFactory.memberOfKakao();
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("사용자 폴더 목록 조회")
    void getFolderByMember() {

        // Given
        given(userDetails.getMember()).willReturn(member);  // Mock member
        given(folderRepository.findAllByMember(member)).willReturn(
                Arrays.asList(
                        FolderFactory.folder(1L, "folder1"),
                        FolderFactory.folder(2L, "folder2")
                ));  // Mock repository response

        // When
        FolderListResponse response = folderService.getFoldersByMember(userDetails);

        // Then
        verify(folderRepository).findAllByMember(member);

        // Verify the response using AssertJ
        assertThat(response.folders()).hasSize(2);
        assertThat(response.folders())
                .extracting(FolderDto::id, FolderDto::name, FolderDto::articleCount)
                .containsExactlyInAnyOrder(
                        tuple(1L, "folder1", 0L),
                        tuple(2L, "folder2", 0L)
                );

    }

}
