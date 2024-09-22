package com.a301.newsseug.domain.member.repository;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.MemberPress;
import com.a301.newsseug.domain.press.model.entity.Press;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberPressRepository extends JpaRepository<MemberPress, Long> {

    Optional<MemberPress> findByMemberAndPress(Member member, Press press);

    @EntityGraph(attributePaths = {"press"})
    List<MemberPress> findAllByMember(Member member);

    Boolean existsByMemberAndPress(Member member, Press press);

}
