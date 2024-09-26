package com.a301.newsseug.domain.press.service;

import java.util.List;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.model.dto.SimplePressDto;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.dto.response.ListSimplePressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PressServiceImpl implements PressService {

    private final PressRepository pressRepository;
    private final SubscribeRepository subscribeRepository;

    @Override
    public ListSimplePressResponse getSimplePress(CustomUserDetails userDetails) {

        List<Press> press = pressRepository.findAll();

        Member member = userDetails.getMember();

        List<SimplePressDto> simplePressDtoList = press.stream().map(p ->
            SimplePressDto.of(p, subscribeRepository.existsByMemberAndPress(member, p))
        ).toList();

        return ListSimplePressResponse.of(simplePressDtoList);
    }

    @Override
    public GetPressResponse getPress(Long pressId) {

        Press press = pressRepository.getOrThrow(pressId);

        return GetPressResponse.of(press);
    }

    @Override
    public GetPressResponse getPress(Long pressId, CustomUserDetails userDetailsOptional) {
        Press press = pressRepository.getOrThrow(pressId);

        Member member = userDetailsOptional.getMember();

        return GetPressResponse.of(press, subscribeRepository.existsByMemberAndPress(member, press));
    }
}
