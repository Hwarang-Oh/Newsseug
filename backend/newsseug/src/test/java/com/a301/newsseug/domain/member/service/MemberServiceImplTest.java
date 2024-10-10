package com.a301.newsseug.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.tuple;
import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.factory.entity.FolderFactory;
import com.a301.newsseug.domain.folder.factory.fixtures.FolderFixtures;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.factory.dto.MemberRequestFactory;
import com.a301.newsseug.domain.member.factory.entity.SubscribeFactory;
import com.a301.newsseug.domain.member.model.dto.request.UpdateMemberRequest;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberFolderResponse;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberResponse;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.model.entity.type.GenderType;
import com.a301.newsseug.domain.member.repository.MemberRepository;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.exception.NotSubscribePressException;
import com.a301.newsseug.domain.press.factory.PressFactory;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.domain.Sort;

@DisplayName("멤버 관련 기능")
@ExtendWith(MockitoExtension.class)
class MemberServiceImplTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private PressRepository pressRepository;

    @Mock
    private SubscribeRepository subscribeRepository;

    @Mock
    private FolderRepository folderRepository;

    @Mock
    private CustomUserDetails userDetails;

    @InjectMocks
    private MemberServiceImpl memberService;

    private Member loginMember;

    @BeforeEach
    void beforeEach() {
        loginMember = MemberFactory.memberOfKakao(1L);
        given(userDetails.getMember()).willReturn(loginMember);
    }

    @Test
    @DisplayName("정보 조회[성공]")
    void getMember() {

        // When
        GetMemberResponse response = memberService.getMember(userDetails);

        // Then
        assertThat(loginMember.getNickname()).isEqualTo(response.nickname());
        assertThat(loginMember.getProfileImageUrl()).isEqualTo(response.profileImageUrl());

    }


    @Test
    @DisplayName("정보 수정[성공]")
    void updateMember() {

        // Given
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        UpdateMemberRequest request = MemberRequestFactory.updateMemberRequest();

        // When
        memberService.updateMember(userDetails, request);

        // Then
        assertThat(loginMember.getNickname()).isEqualTo(request.nickname());
        assertThat(loginMember.getGender()).isEqualTo(GenderType.convertToEnum(request.gender()));
        assertThat(loginMember.getBirth()).isEqualTo(LocalDate.parse(request.birth(), formatter));

    }

    @Test
    @DisplayName("구독 언론사 조회[성공]")
    void getPressByMember() {

        // Given
        Press press = PressFactory.press(1L);
        Subscribe subscribe = SubscribeFactory.subscribe(1L, press.getPressId());
        given(subscribeRepository.findAllByMember(loginMember)).willReturn(List.of(subscribe));

        // When
        List<GetPressResponse> response = memberService.getPressByMember(userDetails);

        // Then
        verify(subscribeRepository).findAllByMember(loginMember);
        assertThat(response).hasSize(1);

    }

    @Test
    @DisplayName("내 폴더 목록 조회[성공]")
    void getFoldersByMember() {

        // Given
        Pageable pageable = PageRequest.of(
                0,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.CREATED_AT.getValue())
        );

        given(folderRepository.findAllByMember(loginMember, pageable)).willReturn(
                new SliceImpl<>(List.of(FolderFactory.folder(1L), FolderFactory.folder(2L)), pageable, true)
        );

        SlicedResponse<List<GetMemberFolderResponse>> slicedResponse = memberService.getFoldersByMember(userDetails, 0);
        List<GetMemberFolderResponse> response = slicedResponse.getContent();

        assertThat(response)
                .extracting(GetMemberFolderResponse::id, GetMemberFolderResponse::title, GetMemberFolderResponse::articleCount)
                .containsExactlyInAnyOrder(
                        tuple(1L, FolderFixtures.title, 0L),
                        tuple(2L, FolderFixtures.title, 0L)
                );


    }

    @Test
    @DisplayName("구독[성공]")
    void subscribe() {

        // Given
        Press press = PressFactory.press(1L);
        given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
        given(subscribeRepository.findByMemberAndPress(loginMember, press)).willReturn(Optional.empty());

        // When
        memberService.subscribe(userDetails, press.getPressId());

        // Then
        verify(subscribeRepository).save(any(Subscribe.class));

    }

    @Test
    @DisplayName("구독[성공 - 재활성화]")
    void subscribeAlreadySubscribed() {

        // Given
        Press press = PressFactory.press(1L);
        Subscribe subscribe = SubscribeFactory.subscribe(1L, press.getPressId());
        given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
        given(subscribeRepository.findByMemberAndPress(loginMember, press)).willReturn(Optional.of(subscribe));

        // When
        memberService.subscribe(userDetails, press.getPressId());

        // Then
        verify(subscribeRepository, never()).save(any());
        assertThat(subscribe.getActivationStatus()).isEqualByComparingTo(ActivationStatus.ACTIVE);

    }

    @Test
    @DisplayName("구독 취소[성공]")
    void unsubscribe() {

        // Given
        Press press = PressFactory.press(1L);
        Subscribe subscribe = SubscribeFactory.subscribe(1L, press.getPressId());
        given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
        given(subscribeRepository.findByMemberAndPress(loginMember, press)).willReturn(Optional.of(subscribe));

        // When
        memberService.unsubscribe(userDetails, press.getPressId());

        // Then
        assertThat(subscribe.getActivationStatus()).isEqualTo(ActivationStatus.INACTIVE);
    }

    @Test
    @DisplayName("구독 취소[실패 - 구독하지 않은 언론사]")
    void unsubscribeNotSubscribed() {

        // Given
        Press press = PressFactory.press(1L);
        given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
        given(subscribeRepository.findByMemberAndPress(loginMember, press)).willReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> memberService.unsubscribe(userDetails, press.getPressId()))
                .isInstanceOf(NotSubscribePressException.class);
        
    }

}