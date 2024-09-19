package com.a301.newsseug.external.jwt.service;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;

public interface JwtService {

    String issueToken(Member member, TokenType type) throws FailToIssueTokenException;
    Header parseHeader(String token);
    Claims parseClaims(String token);
    boolean isValid(String token) throws JwtException;
    String resolveToken(HttpServletRequest request);
}
