package com.a301.newsseug.external.jwt.filter;

import static com.a301.newsseug.global.constant.ErrorMessage.UNTRUSTWORTHY_TOKEN_MESSAGE;
import static com.a301.newsseug.global.constant.RegEx.EXCEPTION_URI_REGEX;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;

import com.a301.newsseug.domain.auth.service.CustomUserDetailsService;
import com.a301.newsseug.external.jwt.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
@RequiredArgsConstructor
public class AuthorizationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain
    ) throws ServletException, IOException {

        if (Objects.isNull(request.getHeader(AUTHORIZATION))) {
            filterChain.doFilter(request, response);
            return;
        }

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

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {

        for (String regex : EXCEPTION_URI_REGEX) {
            if (request.getRequestURI().matches(regex)) {
                log.info(request.getRequestURI());
                return true;
            }
        }

        return false;

    }

}
