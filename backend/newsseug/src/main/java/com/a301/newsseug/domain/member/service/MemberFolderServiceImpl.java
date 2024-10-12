package com.a301.newsseug.domain.member.service;

import com.a301.newsseug.domain.auth.model.entity.CustomUserDetails;
import com.a301.newsseug.domain.folder.model.entity.Folder;
import com.a301.newsseug.domain.folder.repository.FolderRepository;
import com.a301.newsseug.domain.member.model.dto.response.GetMemberFolderResponse;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.enums.SortingCriteria;
import com.a301.newsseug.global.model.dto.SlicedResponse;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import com.a301.newsseug.global.model.entity.SliceDetails;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberFolderServiceImpl implements MemberFolderService {

    private final FolderRepository folderRepository;

    @Override
    @Transactional(readOnly = true)
    public SlicedResponse<List<GetMemberFolderResponse>> getFoldersByMember(CustomUserDetails userDetails, int pageNumber) {

        Pageable pageable = PageRequest.of(
                pageNumber,
                10,
                Sort.by(Sort.Direction.DESC, SortingCriteria.UPDATE_AT.getField())
        );

        Member loginMember = userDetails.getMember();
        Slice<Folder> sliced = folderRepository.findAllByMemberAndActivationStatus(loginMember, ActivationStatus.ACTIVE, pageable);

        return SlicedResponse.of(
                SliceDetails.of(sliced.getNumber(), sliced.isFirst(), sliced.hasNext()),
                GetMemberFolderResponse.of(sliced.getContent())
        );

    }

}
