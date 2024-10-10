package com.a301.newsseug.domain.press.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.press.model.dto.response.GetPressDetailsResponse;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import java.util.List;

public interface PressService {

	List<GetPressResponse> getPress(CustomUserDetails userDetails);

	GetPressDetailsResponse getPressDetails(CustomUserDetails userDetails, Long pressId);

}
