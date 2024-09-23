package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.dto.request.MemberUpdateRequest;
import com.a301.newsseug.domain.member.model.entity.GenderType;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.controller.PressController;
import com.a301.newsseug.domain.press.exception.NotSubscribePressException;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import com.a301.newsseug.domain.press.model.dto.response.ListPressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final PressRepository pressRepository;
    private final SubscribeRepository subscribeRepository;
    private final PressController pressController;

    @Override
    public void updateMember(CustomUserDetails UserDetails, MemberUpdateRequest request) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

        Member loginMember = UserDetails.getMember();

        loginMember.setNickname(request.nickname());
        loginMember.setGender(GenderType.convertToEnum(request.gender()));
        loginMember.setBirth(LocalDate.parse(request.birth(), formatter));

    }

    @Override
    public ListPressResponse getPressByMember(CustomUserDetails userDetails) {

        List<Press> press = pressRepository.findAll();

        return ListPressResponse.of(
                press.stream()
                        .map(p ->
                                SimplePressDto.of(
                                        p.getPressId(),
                                        p.getPressBranding().getName(),
                                        p.getPressBranding().getImageUrl(),
                                        subscribeRepository.existsByMemberAndPress(
                                                userDetails.getMember(), p
                                        )
                                )
                        )
                        .collect(Collectors.toList())
        );

    }

    @Override
    public Boolean subscribe(CustomUserDetails userDetails, Long pressId) {

        Member loginMember = userDetails.getMember();
        Press press = pressRepository.getOrThrow(pressId);

        subscribeRepository.save(
                Subscribe.builder()
                        .member(loginMember)
                        .press(press)
                        .build()
        );

        return true;

    }

    @Override
    public Boolean unsubscribe(CustomUserDetails userDetails, Long pressId) {

        Member loginMember = userDetails.getMember();
        Press press = pressRepository.getOrThrow(pressId);

        Subscribe subscribe = subscribeRepository.findByMemberAndPress(loginMember, press)
                .orElseThrow(NotSubscribePressException::new);

        subscribe.inactive();

        return true;

    }

}
