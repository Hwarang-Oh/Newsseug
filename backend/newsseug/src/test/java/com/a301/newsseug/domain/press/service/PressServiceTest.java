package com.a301.newsseug.domain.press.service;

import static org.assertj.core.api.Assertions.*;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.factory.entity.SubscribeFactory;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.lenient;
import static org.mockito.Mockito.verify;
import static org.mockito.BDDMockito.given;

import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.exception.NotExistPressException;
import com.a301.newsseug.domain.press.factory.PressFactory;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.dto.response.GetPressDetailsResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;

@DisplayName("언론사 관련 기능")
@ExtendWith(MockitoExtension.class)
public class PressServiceTest {

	@Mock
	private PressRepository pressRepository;

	@Mock
	private SubscribeRepository subscribeRepository;

	@InjectMocks
	private PressServiceImpl pressService;

	@Mock
	private CustomUserDetails userDetails;

	private Member loginMember;

	@BeforeEach
	void beforeEach() {
		loginMember = MemberFactory.memberOfKakao(1L);
		lenient().when(userDetails.getMember()).thenReturn(loginMember);
	}

	@Test
	@DisplayName("언론사 단순 정보 목록 조회")
	void getPress() {
		// Given
		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);
		List<Subscribe> subscribes = List.of(
				SubscribeFactory.subscribe(0L, press1),
				SubscribeFactory.subscribe(1L, press2)
		);

		given(pressRepository.findAll()).willReturn(List.of(press1, press2));
//		given(subscribeRepository.findAllByMember(loginMember)).willReturn(subscribes);

		// When
		List<GetPressResponse> response = pressService.getPress(userDetails);

		// Then
		assertThat(response).hasSize(2);
		assertThat(response)
			.extracting(GetPressResponse::id, GetPressResponse::name, GetPressResponse::imageUrl, GetPressResponse::isSubscribed)
			.containsExactlyInAnyOrder(
				tuple(
						press1.getPressId(),
						press1.getPressBranding().getName(),
						press1.getPressBranding().getImageUrl(),
						true
				),
				tuple(
						press2.getPressId(),
						press2.getPressBranding().getName(),
						press2.getPressBranding().getImageUrl(),
						true)
			);

		verify(pressRepository).findAll();

	}

	@Test
	@DisplayName("언론사 단순 정보 목록 조회")
	void getPressEmpty() {

		// Given
		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);


		given(pressRepository.findAll()).willReturn(List.of(press1, press2));
//		given(subscribeRepository.findAllByMember(loginMember))
//				.willReturn(List.of(SubscribeFactory.subscribe(0L, press1)));

		// When
		List<GetPressResponse> response = pressService.getPress(userDetails);

		// Then
		assertThat(response).hasSize(2);
		assertThat(response)
			.extracting(GetPressResponse::id, GetPressResponse::name, GetPressResponse::imageUrl, GetPressResponse::isSubscribed)
			.containsExactlyInAnyOrder(
				tuple(0L, "name", "imageUrl", true),
				tuple(1L, "name", "imageUrl", false)
			);

		verify(pressRepository).findAll();

	}

	@Test
	@DisplayName("언론사 상세 조회")
	void getPressDetails() {
		// Given
		Press press = PressFactory.press(0L);

		given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);

		// When
		GetPressDetailsResponse response = pressService.getPressDetails(userDetails, press.getPressId());

		// Then
		verify(pressRepository).getOrThrow(press.getPressId());

		assertThat(response.id()).isEqualTo(press.getPressId());
		assertThat(response.name()).isEqualTo(press.getPressBranding().getName());
		assertThat(response.imageUrl()).isEqualTo(press.getPressBranding().getImageUrl());
		assertThat(response.description()).isEqualTo(press.getDescription());
		assertThat(response.isSubscribed()).isFalse();
		assertThat(response.subscribeCount()).isEqualTo(0L);
	}

	@Test
	@DisplayName("존재하지 않는 언론사 상세 조회")
	void getPressNotExistPressDetails() {

		// Given
		Press press = PressFactory.press(0L);


		given(pressRepository.getOrThrow(press.getPressId())).willThrow(NotExistPressException.class);

		// Then
		assertThatThrownBy(() -> pressService.getPressDetails(userDetails, press.getPressId())).isInstanceOf(NotExistPressException.class);

	}

	@Test
	@DisplayName("로그인 유저 구독한 언론사 상세 조회")
	void getPressDetailsWithLoginUser() {

		// Given
		Press press = PressFactory.press(0L);
		given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
		given(subscribeRepository.existsByMemberAndPressAndActivationStatus(loginMember, press, ActivationStatus.ACTIVE)).willReturn(true);

		// When
		GetPressDetailsResponse response = pressService.getPressDetails(userDetails, press.getPressId());

		// Then
		verify(pressRepository).getOrThrow(press.getPressId());
		verify(subscribeRepository).existsByMemberAndPressAndActivationStatus(loginMember, press, ActivationStatus.ACTIVE);

		assertThat(response.id()).isEqualTo(press.getPressId());
		assertThat(response.name()).isEqualTo(press.getPressBranding().getName());
		assertThat(response.imageUrl()).isEqualTo(press.getPressBranding().getImageUrl());
		assertThat(response.description()).isEqualTo(press.getDescription());
		assertThat(response.isSubscribed()).isTrue();
		assertThat(response.subscribeCount()).isEqualTo(0L);

	}

	@Test
	@DisplayName("로그인 유저 구독하지 않은 언론사 상세 조회")
	void getPressDetailsWithLoginUserNotSubscribe() {

		// Given
		Press press = PressFactory.press(0L);
		given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);
		given(subscribeRepository.existsByMemberAndPressAndActivationStatus(loginMember, press, ActivationStatus.ACTIVE)).willReturn(false);

		// When
		GetPressDetailsResponse response = pressService.getPressDetails(userDetails, press.getPressId());

		// Then
		verify(pressRepository).getOrThrow(press.getPressId());
		verify(subscribeRepository).existsByMemberAndPressAndActivationStatus(loginMember, press, ActivationStatus.ACTIVE);

		assertThat(response.id()).isEqualTo(press.getPressId());
		assertThat(response.name()).isEqualTo(press.getPressBranding().getName());
		assertThat(response.imageUrl()).isEqualTo(press.getPressBranding().getImageUrl());
		assertThat(response.description()).isEqualTo(press.getDescription());
		assertThat(response.isSubscribed()).isFalse();
		assertThat(response.subscribeCount()).isEqualTo(0L);

	}

}
