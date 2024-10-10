package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.model.entity.Press;
import java.util.List;

public interface SubscribeService {

    List<Subscribe> getSubscribeByMember(Member member);

    Boolean isSubscribed(Member member, Press press);

}
