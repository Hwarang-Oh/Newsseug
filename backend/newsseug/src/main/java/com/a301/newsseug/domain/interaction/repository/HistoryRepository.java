package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.member.model.entity.Member;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

	@EntityGraph(attributePaths = "article")
	Page<History> findByMember(Member member, Pageable pageable);

	Slice<History> findAllByMember(Member member, Pageable slice);

}
