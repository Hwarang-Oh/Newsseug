package com.a301.newsseug.domain.member.factory.entity;

import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.factory.PressFactory;
import com.a301.newsseug.domain.press.model.entity.Press;
import org.springframework.test.util.ReflectionTestUtils;

public class SubscribeFactory {

    public static Subscribe subscribe(
            Long subscribeId, Press press
    ) {

        Subscribe subscribe = Subscribe.builder()
                .member(MemberFactory.memberOfKakao(1L))
                .press(press)
                .build();

        ReflectionTestUtils.setField(subscribe, "subscribeId", subscribeId);
        return subscribe;

    }

}
