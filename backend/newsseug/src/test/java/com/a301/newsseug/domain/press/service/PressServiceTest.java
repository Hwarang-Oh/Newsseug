package com.a301.newsseug.domain.press.service;

import static com.a301.newsseug.external.jwt.factory.fixtures.JwtFixtures.JWT_SECRET;
import static org.assertj.core.api.Assertions.*;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
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
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;
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

		given(pressRepository.findAll()).willReturn(List.of(press1, press2));
		given(subscribeRepository.existsByMemberAndPress(loginMember, press1)).willReturn(true);
		given(subscribeRepository.existsByMemberAndPress(loginMember, press2)).willReturn(true);

		// When
		ListSimplePressResponse response = pressService.getPress(userDetails);

		// Then
		assertThat(response.press()).hasSize(2);
		assertThat(response.press())
			.extracting(SimplePressDto::id, SimplePressDto::name, SimplePressDto::imageUrl, SimplePressDto::isSubscribed)
			.containsExactlyInAnyOrder(
				tuple(0L, "name", "imageUrl", true),
				tuple(1L, "name", "imageUrl", true)
			);

		verify(pressRepository).findAll();
		verify(subscribeRepository).existsByMemberAndPress(loginMember, press1);
		verify(subscribeRepository).existsByMemberAndPress(loginMember, press2);
	}

	@Test
	@DisplayName("언론사 단순 정보 목록 조회")
	void getPressEmpty() {

		// Given
		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);


		given(pressRepository.findAll()).willReturn(List.of(press1, press2));
		given(subscribeRepository.existsByMemberAndPress(loginMember, press1)).willReturn(true);
		given(subscribeRepository.existsByMemberAndPress(loginMember, press2)).willReturn(false);

		// When
		ListSimplePressResponse response = pressService.getPress(userDetails);

		// Then
		assertThat(response.press()).hasSize(2);
		assertThat(response.press())
			.extracting(SimplePressDto::id, SimplePressDto::name, SimplePressDto::imageUrl, SimplePressDto::isSubscribed)
			.containsExactlyInAnyOrder(
				tuple(0L, "name", "imageUrl", true),
				tuple(1L, "name", "imageUrl", false)
			);

		verify(pressRepository).findAll();
		verify(subscribeRepository).existsByMemberAndPress(loginMember, press1);
		verify(subscribeRepository).existsByMemberAndPress(loginMember, press2);
	}

	@Test
	@DisplayName("언론사 상세 조회")
	void getPressDetails() {
		// Given
		Press press = PressFactory.press(0L);

		given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);

		// When
		GetPressResponse response = pressService.getPressDetails(userDetails, press.getPressId());

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
		given(subscribeRepository.existsByMemberAndPress(loginMember, press)).willReturn(true);

		// When
		GetPressResponse response = pressService.getPressDetails(userDetails, press.getPressId());

		// Then
		verify(pressRepository).getOrThrow(press.getPressId());
		verify(subscribeRepository).existsByMemberAndPress(loginMember, press);

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
		given(subscribeRepository.existsByMemberAndPress(loginMember, press)).willReturn(false);

		// When
		GetPressResponse response = pressService.getPressDetails(userDetails, press.getPressId());

		// Then
		verify(pressRepository).getOrThrow(press.getPressId());
		verify(subscribeRepository).existsByMemberAndPress(loginMember, press);

		assertThat(response.id()).isEqualTo(press.getPressId());
		assertThat(response.name()).isEqualTo(press.getPressBranding().getName());
		assertThat(response.imageUrl()).isEqualTo(press.getPressBranding().getImageUrl());
		assertThat(response.description()).isEqualTo(press.getDescription());
		assertThat(response.isSubscribed()).isFalse();
		assertThat(response.subscribeCount()).isEqualTo(0L);

	}

}
