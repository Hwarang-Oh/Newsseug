package com.a301.newsseug.domain.member.factory.entity;

import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.factory.PressFactory;
import org.springframework.test.util.ReflectionTestUtils;

public class SubscribeFactory {

    public static Subscribe subscribe(
            Long subscribeId, Long pressId
    ) {

        Subscribe subscribe = Subscribe.builder()
                .member(MemberFactory.memberOfKakao(1L))
                .press(PressFactory.press(pressId))
                .build();

        ReflectionTestUtils.setField(subscribe, "subscribeId", subscribeId);
        return subscribe;

    }

}
