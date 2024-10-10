package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.press.model.entity.Press;

public interface SubscribeService {

    Boolean isSubscribed(Member member, Press press);

}
