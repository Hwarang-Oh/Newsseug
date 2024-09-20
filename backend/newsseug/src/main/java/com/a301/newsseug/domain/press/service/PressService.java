package com.a301.newsseug.domain.press.service;

import java.util.Optional;

import com.a301.newsseug.domain.press.model.dto.GetPressBrandingResponseDto;
import com.a301.newsseug.domain.press.model.dto.GetPressResponseDto;

public interface PressService {
	GetPressBrandingResponseDto getPressBranding();

	Optional<GetPressResponseDto> getPress(Long pressId);
}
