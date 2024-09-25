package com.a301.newsseug.external.jwt.filter;

import static com.a301.newsseug.global.constant.ErrorMessage.UNTRUSTWORTHY_TOKEN_MESSAGE;

import com.a301.newsseug.domain.auth.service.CustomUserDetailsService;
import com.a301.newsseug.external.jwt.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
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

       if (!StringUtils.hasText(token)) {
           filterChain.doFilter(request, response);
           return;
       }

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
