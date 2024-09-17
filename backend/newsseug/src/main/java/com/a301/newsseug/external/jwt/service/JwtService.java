package com.a301.newsseug.external.jwt.service;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.external.jwt.exception.FailToIssueTokenException;
import com.a301.newsseug.external.jwt.model.entity.TokenType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;

public interface JwtService {

    String issueToken(Member member, TokenType type) throws FailToIssueTokenException;
    Header extractHeader(String token);
    Claims extractClaims(String token);
    boolean isValidated(String token) throws JwtException;

}
