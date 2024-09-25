package com.a301.newsseug.domain.press.service;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.a301.newsseug.domain.press.factory.PressFactory;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;

@DisplayName("언론사 관련 기능")
public class PressServiceTest {

	@InjectMocks
	private PressServiceImpl pressService;

	@Mock
	private PressRepository pressRepository;

	@Test
	@DisplayName("언론사 단순 정보 목록 조회")
	void getSimplePress() {
		// Given
		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);

		Mockito.when(pressRepository.findAll()).thenReturn(List.of(press1, press2));

		// When
		ListSimplePressResponse response = pressService.getSimplePress();

		// Then
		Mockito.verify(pressRepository).findAll();

		assertThat(response.press()).hasSize(2);
		assertThat(response.press())
			.extracting(SimplePressDto::id, SimplePressDto::name, SimplePressDto::imageUrl)
			.containsExactlyInAnyOrder(
				tuple(0L, "name", "imageUrl"),
				tuple(1L, "name", "imageUrl")
			);
	}

	@Test
	@DisplayName("언론사 상세 조회")
	void getPress() {
		// Given
		Press press = PressFactory.press(0L);

		Mockito.when(pressRepository.findByPressId(press.getPressId())).thenReturn(press);

		// When
		GetPressResponse response = pressService.getPress(press.getPressId());

		// Then
		Mockito.verify(pressRepository).findByPressId(press.getPressId());

		assertThat(response.id()).isEqualTo(press.getPressId());
		assertThat(response.name()).isEqualTo(press.getPressBranding().getName());
		assertThat(response.imageUrl()).isEqualTo(press.getPressBranding().getImageUrl());
		assertThat(response.description()).isEqualTo(press.getDescription());
		assertThat(response.subscribeCount()).isEqualTo(0L);
	}
}
