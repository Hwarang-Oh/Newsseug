package com.a301.newsseug.external.jwt.service;

import com.a301.newsseug.external.jwt.model.entity.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;

public interface JwtService {

    String issueToken(String providerId, TokenType type);

    String reissueAccessToken(String refreshToken, String providerId);

    Boolean discardRefreshToken(String providerId);

    Header parseHeader(String token);

    Claims parseClaims(String token);

    boolean isValid(String token) throws JwtException;

    String resolveToken(HttpServletRequest request);
    
}
