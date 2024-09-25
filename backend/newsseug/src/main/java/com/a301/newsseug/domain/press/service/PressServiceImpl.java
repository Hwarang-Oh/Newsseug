package com.a301.newsseug.domain.press.service;

import java.util.List;

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

    @Override
    public ListSimplePressResponse getSimplePress() {

        List<Press> press = pressRepository.findAll();

        List<SimplePressDto> simplePressDtoList = press.stream().map(SimplePressDto::of).toList();

        return ListSimplePressResponse.of(simplePressDtoList);
    }

    @Override
    public GetPressResponse getPress(Long pressId) {

        Press press = pressRepository.getOrThrow(pressId);

        return GetPressResponse.of(press);
    }
}
