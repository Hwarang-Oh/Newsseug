package com.a301.newsseug.domain.press.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;


import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.factory.entity.MemberFactory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.press.factory.PressFactory;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.service.PressService;

import static org.mockito.BDDMockito.given;

import java.util.List;
import java.util.stream.Stream;

@SpringBootTest
@AutoConfigureMockMvc
class PressControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	PressService pressService;

	@Test
	void getPressSubscribed() throws Exception {

		// Given
		Member member = MemberFactory.memberOfKakao(0L);
		CustomUserDetails customUserDetails = CustomUserDetails.of(member);

		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);

		List<GetPressResponse> getPressResponseList = Stream.of(press1, press2).map(p -> GetPressResponse.of(p, true)).toList();
		given(pressService.getPress(customUserDetails)).willReturn(getPressResponseList);

		// When&Then
		mockMvc.perform(get("/api/v1/press")
			.with(SecurityMockMvcRequestPostProcessors.user(customUserDetails))
		).andExpect(status().isOk())
			.andExpect(jsonPath("$.data.press[0].id").value(0L))
			.andExpect(jsonPath("$.data.press[0].name").value("name"))
			.andExpect(jsonPath("$.data.press[0].imageUrl").value("imageUrl"))
			.andExpect(jsonPath("$.data.press[0].isSubscribed").value(true))

			.andExpect(jsonPath("$.data.press[1].id").value(1L))
			.andExpect(jsonPath("$.data.press[1].name").value("name"))
			.andExpect(jsonPath("$.data.press[1].imageUrl").value("imageUrl"))
			.andExpect(jsonPath("$.data.press[1].isSubscribed").value(true));
	}

	@Test
	void getPressNotSubscribed() throws Exception {

		// Given
		Member member = MemberFactory.memberOfKakao(0L);
		CustomUserDetails customUserDetails = CustomUserDetails.of(member);

		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);

		List<GetPressResponse> getPressResponseList = Stream.of(press1, press2).map(p -> GetPressResponse.of(p, false)).toList();
		given(pressService.getPress(customUserDetails)).willReturn(getPressResponseList);

		// When&Then
		mockMvc.perform(get("/api/v1/press")
				.with(SecurityMockMvcRequestPostProcessors.user(customUserDetails))
			).andExpect(status().isOk())
			.andExpect(jsonPath("$.data.press[0].id").value(0L))
			.andExpect(jsonPath("$.data.press[0].name").value("name"))
			.andExpect(jsonPath("$.data.press[0].imageUrl").value("imageUrl"))
			.andExpect(jsonPath("$.data.press[0].isSubscribed").value(false))

			.andExpect(jsonPath("$.data.press[1].id").value(1L))
			.andExpect(jsonPath("$.data.press[1].name").value("name"))
			.andExpect(jsonPath("$.data.press[1].imageUrl").value("imageUrl"))
			.andExpect(jsonPath("$.data.press[1].isSubscribed").value(false));
	}

	@Test
	void getPressComplexSubscribed() throws Exception {

		// Given
		Member member = MemberFactory.memberOfKakao(0L);
		CustomUserDetails customUserDetails = CustomUserDetails.of(member);

		Press press1 = PressFactory.press(0L);
		Press press2 = PressFactory.press(1L);

		List<GetPressResponse> getPressResponseList = List.of(
				GetPressResponse.of(press1, true), GetPressResponse.of(press2, false)
		);

		given(pressService.getPress(customUserDetails)).willReturn(getPressResponseList);

		// When&Then
		mockMvc.perform(get("/api/v1/press")
				.with(SecurityMockMvcRequestPostProcessors.user(customUserDetails))
			).andExpect(status().isOk())
			.andExpect(jsonPath("$.data.press[0].id").value(0L))
			.andExpect(jsonPath("$.data.press[0].name").value("name"))
			.andExpect(jsonPath("$.data.press[0].imageUrl").value("imageUrl"))
			.andExpect(jsonPath("$.data.press[0].isSubscribed").value(true))

			.andExpect(jsonPath("$.data.press[1].id").value(1L))
			.andExpect(jsonPath("$.data.press[1].name").value("name"))
			.andExpect(jsonPath("$.data.press[1].imageUrl").value("imageUrl"))
			.andExpect(jsonPath("$.data.press[1].isSubscribed").value(false));
	}

	@Test
	void getPressDetailNotLogin() throws Exception {

		// // Given
		// Press press = PressFactory.press(0L);
		//
		// GetPressResponse response = GetPressResponse.of(press);
		//
		// given(pressService.getPress(press.getPressId())).willReturn(response);
		//
		// // When&Then
		// mockMvc.perform(get("/api/v1/press/0"))
		// 	.andExpect(status().isOk())
		// 	.andExpect(jsonPath("$.data.press.id").value(0L))
		// 	.andExpect(jsonPath("$.data.press.name").value("name"))
		// 	.andExpect(jsonPath("$.data.press.imageUrl").value("imageUrl"))
		// 	.andExpect(jsonPath("$.data.press.isSubscribed").doesNotExist());
	}

}