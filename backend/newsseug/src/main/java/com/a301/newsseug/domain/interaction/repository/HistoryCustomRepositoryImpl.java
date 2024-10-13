package com.a301.newsseug.domain.interaction.repository;

import static com.a301.newsseug.domain.interaction.model.entity.QHistory.history;

import com.a301.newsseug.domain.article.model.entity.type.ConversionStatus;
import com.a301.newsseug.domain.interaction.model.entity.History;
import com.a301.newsseug.domain.interaction.model.entity.QHistory;
import com.a301.newsseug.domain.member.model.entity.Member;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class HistoryCustomRepositoryImpl implements HistoryCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<History> findAllByMember(Member member, Pageable pageable) {
        QHistory historySub = new QHistory("historySub");
        BooleanBuilder builder = createBaseCondition();
        builder.and(
                history.createdAt.eq(
                        JPAExpressions
                                .select(historySub.createdAt.max())
                                .from(historySub)
                                .where(historySub.article.eq(history.article).and(historySub.member.eq(history.member)))
                )
        );
        return executeQuery(builder, pageable);
    }

    /**
     * 공통 조건을 처리하는 메서드
     * @return BooleanBuilder에 상태와 변환 상태 조건을 추가한 빌더
     */
    private BooleanBuilder createBaseCondition() {

        BooleanBuilder builder = new BooleanBuilder();
        builder.and(history.article.activationStatus.eq(ActivationStatus.ACTIVE));
        builder.and(history.article.conversionStatus.eq(ConversionStatus.SUCCESS));
        return builder;

    }

    /**
     * 쿼리를 실행하고 Slice로 반환하는 메서드
     * @param builder BooleanBuilder에 추가된 조건
     * @param pageable 페이징 정보
     * @return Slice<Article>
     */
    private Slice<History> executeQuery(BooleanBuilder builder, Pageable pageable) {

        List<History> content = jpaQueryFactory
                .selectFrom(history)
                .join(history.article).fetchJoin()
                .join(history.article.press).fetchJoin()
                .where(builder)
                .orderBy(history.createdAt.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize();

        if (hasNext) {
            content.remove(content.size() - 1);
        }

        return new SliceImpl<>(content, pageable, hasNext);

    }

}
