package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.member.model.entity.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface HistoryCustomRepository {

    Slice<History> findAllByMember(Member member, Pageable slice);

}
