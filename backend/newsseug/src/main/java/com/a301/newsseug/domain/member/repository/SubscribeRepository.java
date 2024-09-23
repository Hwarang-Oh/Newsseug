package com.a301.newsseug.domain.member.repository;

import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.domain.member.model.entity.Subscribe;
import com.a301.newsseug.domain.press.model.entity.Press;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscribeRepository extends JpaRepository<Subscribe, Long> {

    Optional<Subscribe> findByMemberAndPress(Member member, Press press);

    @EntityGraph(attributePaths = {"press"})
    List<Subscribe> findAllByMember(Member member);

    Boolean existsByMemberAndPress(Member member, Press press);

}
