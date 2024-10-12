package com.a301.newsseug.domain.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.factory.entity.SubscribeFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.exception.NotSubscribePressException;
import com.a301.newsseug.domain.press.factory.PressFactory;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@DisplayName("사용자-언론사 관련 기능")
@ExtendWith(MockitoExtension.class)
class MemberPressImplTest {

    @Mock
    private PressRepository pressRepository;

    @Mock
    private SubscribeRepository subscribeRepository;

    @Mock
    private CustomUserDetails userDetails;

    @InjectMocks
    private MemberPressServiceImpl memberPressService;

    private Member loginMember;

    @BeforeEach
    void beforeEach() {
        loginMember = MemberFactory.memberOfKakao(1L);
        given(userDetails.getMember()).willReturn(loginMember);
    }

    @Test
    @DisplayName("구독[성공]")
    void subscribe() {

        // Given
        Press press = PressFactory.press(1L);
        given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
        given(subscribeRepository.findByMemberAndPress(loginMember, press)).willReturn(Optional.empty());

        // When
        memberPressService.subscribe(userDetails, press.getPressId());

        // Then
        verify(subscribeRepository).save(any(Subscribe.class));

    }

    @Test
    @DisplayName("구독[성공 - 재활성화]")
    void subscribeAlreadySubscribed() {

        // Given
        Press press = PressFactory.press(1L);
        Subscribe subscribe = SubscribeFactory.subscribe(1L, press);
        given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
        given(subscribeRepository.findByMemberAndPress(loginMember, press)).willReturn(Optional.of(subscribe));

        // When
        memberPressService.subscribe(userDetails, press.getPressId());

        // Then
        verify(subscribeRepository, never()).save(any());
        assertThat(subscribe.getActivationStatus()).isEqualByComparingTo(ActivationStatus.ACTIVE);

    }

    @Test
    @DisplayName("구독 취소[성공]")
    void unsubscribe() {

        // Given
        Press press = PressFactory.press(1L);
        Subscribe subscribe = SubscribeFactory.subscribe(1L, press);
        given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
        given(subscribeRepository.findByMemberAndPress(loginMember, press)).willReturn(Optional.of(subscribe));

        // When
        memberPressService.unsubscribe(userDetails, press.getPressId());

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
        assertThatThrownBy(() -> memberPressService.unsubscribe(userDetails, press.getPressId()))
                .isInstanceOf(NotSubscribePressException.class);
        
    }

}