package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import java.util.List;

public interface SubscribeService {

    List<GetPressResponse> getSubscribesMember(CustomUserDetails userDetails);

    void subscribe(CustomUserDetails userDetails, Long pressId);

    void unsubscribe(CustomUserDetails userDetails, Long pressId);

    List<Subscribe> getSubscribeByMember(Member member);

    Boolean isSubscribed(Member member, Press press);

}
