package com.a301.newsseug.external.jwt.filter;

import static com.a301.newsseug.global.constant.ErrorMessage.UNTRUSTWORTHY_TOKEN_MESSAGE;
import static com.a301.newsseug.global.execption.ErrorCode.UNTRUSTWORTHY_TOKEN;

import com.a301.newsseug.domain.auth.service.CustomUserDetailsService;
import com.a301.newsseug.external.jwt.exception.ExpiredTokenException;
import com.a301.newsseug.external.jwt.exception.InvalidFormatException;
import com.a301.newsseug.external.jwt.exception.InvalidSignatureException;
import com.a301.newsseug.external.jwt.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException {


       String token = jwtService.resolveToken(request);

       try {

           if (jwtService.isValid(token)) {
               Claims claims = jwtService.parseClaims(token);
               UserDetails userDetails = customUserDetailsService.loadUserByUsername(claims.getSubject());
               UsernamePasswordAuthenticationToken authentication
                       = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());

               SecurityContextHolder.getContext().setAuthentication(authentication);
           }

       } catch (JwtException e) {
           response.sendError(HttpServletResponse.SC_UNAUTHORIZED, UNTRUSTWORTHY_TOKEN_MESSAGE);
       } finally {
           filterChain.doFilter(request, response);
       }

    }

}
