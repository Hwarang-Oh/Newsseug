package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.member.model.entity.Member;

import com.a301.newsseug.global.model.entity.ActivationStatus;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {

	@EntityGraph(attributePaths = "article")
	@Query("SELECT h "
			+ "FROM History h "
			+ "LEFT JOIN FETCH "
				+ "h.article "
			+ "LEFT JOIN FETCH "
				+ "h.article.press "
			+ "WHERE "
				+ "h.article.activationStatus = 'ACTIVE' AND "
				+ "h.article.conversionStatus = 'SUCCESS' AND "
				+ "h.member = :member "
	)
	Page<History> findAllByMember(@Param("member") Member member, Pageable pageable);

	@Query(
			"SELECT h "
			+ "FROM History h "
			+ "LEFT JOIN FETCH "
					+ "h.article "
			+ "LEFT JOIN FETCH "
					+ "h.article.press "
			+ "WHERE "
					+ "h.article.activationStatus = 'ACTIVE' AND "
					+ "h.article.conversionStatus = 'SUCCESS' AND "
					+ "h.member = :member "
	)
	Page<History> findAllByMemberOrderByUpdatedAt(
			@Param("member") Member member, Pageable pageable
	);

	Optional<History> findByMemberAndArticleAndActivationStatus(
			Member member, Article article, ActivationStatus activationStatus
	);

}

