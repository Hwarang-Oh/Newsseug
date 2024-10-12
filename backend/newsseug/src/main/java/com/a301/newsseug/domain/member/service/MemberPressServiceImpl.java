package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.exception.NotSubscribePressException;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MemberPressServiceImpl implements MemberPressService {

    private final PressRepository pressRepository;
    private final SubscribeRepository subscribeRepository;

    @Override
    @Transactional(readOnly = true)
    public List<GetPressResponse> getPressByMember(CustomUserDetails userDetails) {

        List<Subscribe> subscribes = subscribeRepository.findAllByMemberAndActivationStatus(userDetails.getMember(), ActivationStatus.ACTIVE);
        return GetPressResponse.fromSubscribe(
                subscribes
        );

    }

    @Override
    public void subscribe(CustomUserDetails userDetails, Long pressId) {

        Member loginMember = userDetails.getMember();
        Press press = pressRepository.getOrThrow(pressId);
        Optional<Subscribe> subscribe = subscribeRepository.findByMemberAndPress(loginMember, press);

        if (subscribe.isPresent()) {
            subscribe.get().active();
            press.incrementSubscribeCount();
            return;
        }

        subscribeRepository.save(
                Subscribe.builder()
                        .member(loginMember)
                        .press(press)
                        .build()
        );

        press.incrementSubscribeCount();

    }

    @Override
    public void unsubscribe(CustomUserDetails userDetails, Long pressId) {

        Member loginMember = userDetails.getMember();
        Press press = pressRepository.getOrThrow(pressId);
        Subscribe subscribe = subscribeRepository.findByMemberAndPress(loginMember, press)
                .orElseThrow(NotSubscribePressException::new);

        subscribe.inactive();
        press.decrementSubscribeCount();

    }

}
