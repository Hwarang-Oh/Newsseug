package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.dto.request.UpdateMemberRequest;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberFolderResponse;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberResponse;
import com.a301.newsseug.domain.member.model.entity.type.GenderType;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.member.repository.MemberRepository;
import com.a301.newsseug.domain.member.repository.SubscribeRepository;
import com.a301.newsseug.domain.press.exception.NotSubscribePressException;
import com.a301.newsseug.domain.press.model.dto.response.GetPressResponse;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.domain.press.repository.PressRepository;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import com.a301.newsseug.global.model.entity.SliceDetails;
import io.jsonwebtoken.lang.Strings;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional(readOnly = true)
    public GetMemberResponse getMember(CustomUserDetails userDetails) {
        return GetMemberResponse.of(userDetails.getMember());
    }

    @Override
    public void updateMember(CustomUserDetails userDetails, UpdateMemberRequest request) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        Member loginMember = userDetails.getMember();
        loginMember = memberRepository.getOrThrow(loginMember.getOAuth2Details().getProviderId());

        if (Strings.hasText(request.birth())) {
            loginMember.setBirth(LocalDate.parse(request.birth(), formatter));
        }

        if (Strings.hasText(request.gender())) {
            loginMember.setGender(GenderType.convertToEnum(request.gender()));
        }

        if (Strings.hasText(request.nickname())) {
            loginMember.setNickname(request.nickname());
        }

        if (Strings.hasText(request.profileImageUrl())) {
            loginMember.setProfileImageUrl(request.profileImageUrl());
        }

        loginMember.setIsFirst(false);

    }

}
