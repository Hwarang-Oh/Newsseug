package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService {

    private final SubscribeRepository subscribeRepository;

    @Override
    public Boolean isSubscribed(Member member, Press press) {
        return subscribeRepository.existsByMemberAndPressAndActivationStatus(
                member, press, ActivationStatus.ACTIVE
        );
    }

}
