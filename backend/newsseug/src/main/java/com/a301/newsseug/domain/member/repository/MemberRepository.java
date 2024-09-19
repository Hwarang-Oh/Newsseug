package com.a301.newsseug.domain.member.repository;

import com.a301.newsseug.domain.member.exception.NotExistMemberException;
import com.a301.newsseug.domain.member.model.entity.Member;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    default Member getOrThrow(String providerId) {
        return findByProviderId(providerId).orElseThrow(NotExistMemberException::new);
    }

    @Query("SELECT m FROM Member m WHERE m.oAuth2Details.providerId = :providerId")
    Optional<Member> findByProviderId(@Param("providerId") String providerId);

}
