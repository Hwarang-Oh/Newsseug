package com.a301.newsseug.global.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

public class CookieUtil {

    public static Cookie create(HttpServletResponse response, String cookieName, String value, Long maxAge) {

        Cookie cookie = new Cookie(cookieName, value);

        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge.intValue());
        cookie.setSecure(true);

        response.addCookie(cookie);

        return cookie;

    }

    public static void delete(HttpServletResponse response, String cookieName) {

        Cookie cookie = new Cookie(cookieName, null);

        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

    }


    public static Optional<Cookie> getCookie(HttpServletRequest request, String cookieName) {

        Cookie[] cookies = request.getCookies();

        if (Objects.nonNull(cookies)) {
            return Arrays.stream(cookies)
                    .filter(cookie -> cookie.getName().equals(cookieName))
                    .findFirst();
        }

        return Optional.empty();

    }

    public static Optional<String> getCookieValue(HttpServletRequest request, String cookieName) {
        return getCookie(request, cookieName).map(Cookie::getValue);
    }

}
