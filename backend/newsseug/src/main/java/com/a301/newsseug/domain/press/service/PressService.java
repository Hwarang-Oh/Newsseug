package com.a301.newsseug.domain.press.service;

import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;

public interface PressService {
	ListSimplePressResponse getSimplePress();

	GetPressResponse getPress(Long pressId);
}
