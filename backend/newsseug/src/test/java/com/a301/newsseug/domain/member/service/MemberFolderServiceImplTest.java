package com.a301.newsseug.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.tuple;
import static org.mockito.BDDMockito.given;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.factory.entity.FolderFactory;
import com.a301.newsseug.domain.folder.factory.fixtures.FolderFixtures;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberFolderResponse;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;

@DisplayName("사용자-폴더 관련 기능")
@ExtendWith(MockitoExtension.class)
class MemberFolderServiceImplTest {

    @Mock
    private FolderRepository folderRepository;

    @Mock
    private CustomUserDetails userDetails;

    @InjectMocks
    private MemberFolderServiceImpl memberFolderService;

    private Member loginMember;

    @BeforeEach
    void beforeEach() {
        loginMember = MemberFactory.memberOfKakao(1L);
        given(userDetails.getMember()).willReturn(loginMember);
    }

    @Test
    @DisplayName("내 폴더 목록 조회[성공]")
    void getFoldersByMember() {

        // Given
        Pageable pageable = PageRequest.of(
                0,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.UPDATE_AT.getField())
        );
        given(folderRepository.findAllByMemberAndActivationStatus(loginMember, ActivationStatus.ACTIVE, pageable))
                .willReturn(new SliceImpl<>(List.of(FolderFactory.folder(1L), FolderFactory.folder(2L)), pageable, true)
        );

        // When
        SlicedResponse<List<GetMemberFolderResponse>> slicedResponse = memberFolderService.getFoldersByMember(userDetails, 0);
        List<GetMemberFolderResponse> response = slicedResponse.getContent();

        // Then
        assertThat(response)
                .extracting(GetMemberFolderResponse::id, GetMemberFolderResponse::title, GetMemberFolderResponse::articleCount)
                .containsExactlyInAnyOrder(
                        tuple(1L, FolderFixtures.title, 0L),
                        tuple(2L, FolderFixtures.title, 0L)
                );

    }

}