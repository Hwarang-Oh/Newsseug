package com.a301.newsseug.domain.press.service;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.verify;
import static org.mockito.BDDMockito.given;

import com.a301.newsseug.domain.press.exception.NotExistPressException;
import com.a301.newsseug.domain.press.factory.PressFactory;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;

@ExtendWith(MockitoExtension.class)
@DisplayName("언론사 관련 기능")
public class PressServiceTest {

	@Mock
	private PressRepository pressRepository;

	@InjectMocks
	private PressServiceImpl pressService;

	@Test
	@DisplayName("언론사 단순 정보 목록 조회")
	void getSimplePress() {
		// Given
		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);

		given(pressRepository.findAll()).willReturn(List.of(press1, press2));

		// When
		ListSimplePressResponse response = pressService.getSimplePress();

		// Then
		assertThat(response.press()).hasSize(2);
		assertThat(response.press())
			.extracting(SimplePressDto::id, SimplePressDto::name, SimplePressDto::imageUrl)
			.containsExactlyInAnyOrder(
				tuple(0L, "name", "imageUrl"),
				tuple(1L, "name", "imageUrl")
			);

		verify(pressRepository).findAll();
	}

	@Test
	@DisplayName("언론사 단순 정보 목록 조회")
	void getSimplePressEmpty() {
		// Given
		given(pressRepository.findAll()).willReturn(List.of());

		// When
		ListSimplePressResponse response = pressService.getSimplePress();

		// Then
		assertThat(response.press()).isEmpty();

		verify(pressRepository).findAll();
	}

	@Test
	@DisplayName("언론사 상세 조회")
	void getPress() {
		// Given
		Press press = PressFactory.press(0L);

		given(pressRepository.getOrThrow(press.getPressId())).willReturn(press);

		// When
		GetPressResponse response = pressService.getPress(press.getPressId());

		// Then
		verify(pressRepository).getOrThrow(press.getPressId());

		assertThat(response.id()).isEqualTo(press.getPressId());
		assertThat(response.name()).isEqualTo(press.getPressBranding().getName());
		assertThat(response.imageUrl()).isEqualTo(press.getPressBranding().getImageUrl());
		assertThat(response.description()).isEqualTo(press.getDescription());
		assertThat(response.subscribeCount()).isEqualTo(0L);
	}

	@Test
	@DisplayName("언론사 상세 조회[존재하지 않는 폴더]")
	void getPressNotExistPress() {
		// Given
		Press press = PressFactory.press(0L);

		given(pressRepository.getOrThrow(press.getPressId())).willThrow(NotExistPressException.class);

		// Then
		assertThatThrownBy(() -> pressService.getPress(press.getPressId())).isInstanceOf(NotExistPressException.class);
	}
}
