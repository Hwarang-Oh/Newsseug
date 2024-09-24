package com.a301.newsseug.external.jwt.service;

import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;

public interface JwtService {

    java.lang.String issueToken(String providerId, TokenType type) throws FailToIssueTokenException;
    Header parseHeader(java.lang.String token);
    Claims parseClaims(java.lang.String token);
    boolean isValid(java.lang.String token) throws JwtException;
    java.lang.String resolveToken(HttpServletRequest request);
}
