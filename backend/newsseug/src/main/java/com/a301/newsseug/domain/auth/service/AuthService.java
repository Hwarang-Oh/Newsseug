package com.a301.newsseug.domain.auth.service;

import com.a301.newsseug.domain.auth.model.dto.response.LoginResponse;
import com.a301.newsseug.domain.auth.model.dto.response.ReissueTokenResponse;
import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;

public interface AuthService {

    LoginResponse login(String providerId);

    Boolean logout(CustomUserDetails userDetails, String providerId);

    ReissueTokenResponse reissueToken(String refreshToken, String providerId);

}
