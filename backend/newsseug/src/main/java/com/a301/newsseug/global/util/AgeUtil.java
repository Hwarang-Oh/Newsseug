package com.a301.newsseug.global.util;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import java.time.LocalDate;
import java.util.Objects;

public class AgeUtil {

    public static int calculateAge(CustomUserDetails userDetails) {

        if (Objects.isNull(userDetails)) {
            return 25;
        }

        int age = LocalDate.now().getYear() - userDetails.getMember().getBirth().getYear();

        if (age % 10 == 0) {
            age++;
        }

        return age;

    }

    public static int calculateAgeBegin(int age) {
        return (int) Math.floor((double) age / 10) * 10;
    }

    public static int calculateAgeEnd(int age) {
        return (int) Math.ceil((double) age / 10) * 10 - 1;
    }

}
