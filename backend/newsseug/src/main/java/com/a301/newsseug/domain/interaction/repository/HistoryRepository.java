package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.member.model.entity.Member;

import org.antlr.v4.runtime.atn.SemanticContext.AND;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

	@EntityGraph(attributePaths = "article")
	Page<History> findByMember(Member member, Pageable pageable);

	@Query(
			"SELECT h "
			+ "FROM History h "
			+ "JOIN h.article a JOIN a.press p "
			+ "JOIN ( "
			+ "SELECT h2.article, h2.member, MAX(h2.createdAt) "
			+ "FROM History h2 "
			+ "WHERE h2.member = :member GROUP BY h2.article, h2.member"
			+ ") AS sub ON h.article = sub.article AND h.member = sub.member AND h.createdAt = sub.createdAt"
	)
	Slice<History> findAllByMember(@Param("member") Member member, Pageable pageable);

}

