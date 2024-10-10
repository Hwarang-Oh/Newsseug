package com.a301.newsseug.domain.article.repository;

import static com.a301.newsseug.domain.article.model.entity.QArticle.article;
import static com.a301.newsseug.domain.article.model.entity.QBirthYearViewCount.birthYearViewCount;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import com.a301.newsseug.domain.article.model.entity.type.ConversionStatus;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.a301.newsseug.global.model.entity.ActivationStatus;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@RequiredArgsConstructor
public class ArticleCustomRepositoryImpl implements ArticleCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<Article> findAllByCategoryAndCreatedAtBetween(
            String filter, LocalDateTime startOfDay, LocalDateTime endOfDay, Pageable pageable
    ) {
        BooleanBuilder builder = createBaseCondition(filter);
        builder.and(article.createdAt.between(startOfDay, endOfDay));
        return executeQuery(builder, pageable);
    }

    @Override
    public Slice<Article> findAllByCategory(String filter, Pageable pageable) {
        BooleanBuilder builder = createBaseCondition(filter);
        return executeQuery(builder, pageable);
    }

    @Override
    public Slice<Article> findAllByPressAndCategory(Press press, String filter, Pageable pageable) {
        BooleanBuilder builder = createBaseCondition(filter);
        builder.and(article.press.eq(press));
        return executeQuery(builder, pageable);
    }

    @Override
    public Slice<Article> findByPress(List<Press> press, String filter, Pageable pageable) {
        BooleanBuilder builder = createBaseCondition(filter);
        builder.and(article.press.in(press));
        return executeQuery(builder, pageable);
    }

    @Override
    public Slice<Article> findAllByTitleIsContainingIgnoreCase(String keyword, String filter, Pageable pageable) {
        BooleanBuilder builder = createBaseCondition(filter);
        builder.and(article.title.containsIgnoreCase(keyword));
        return executeQuery(builder, pageable);
    }

    public Slice<Article> findAllByBirthYearOrderByViewCount(Integer ageBegin, Integer ageEnd, String category, Pageable pageable) {

        BooleanBuilder builder = createBaseCondition(category);
        builder.and(
                Expressions
                        .numberTemplate(Integer.class, "YEAR(CURRENT_DATE) - {0}", birthYearViewCount.birthYear)
                        .between(ageBegin, ageEnd)
        );

        List<Article> content = jpaQueryFactory
                .selectFrom(article)
                .join(article.press).fetchJoin()
                .join(birthYearViewCount).on(birthYearViewCount.article.eq(article))
                .where(builder)
                .orderBy(new OrderSpecifier<>(Order.DESC, birthYearViewCount.viewCount))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize();

        if (hasNext) {
            content.remove(content.size() - 1);
        }

        return new SliceImpl<>(content, pageable, hasNext);

    }

    @Override
    @Modifying
    @Transactional
    public void updateCount(String field, Long id, Long count) {
        PathBuilder<Long> fieldPath = new PathBuilder<>(Long.class, "article." + field);
        jpaQueryFactory.update(article)
                .set(fieldPath,  Expressions.numberTemplate(Long.class, "{0} + {1}", fieldPath, count))
                .where(article.articleId.eq(id))
                .execute();
    }

    /**
     * 공통 조건을 처리하는 메서드
     * @param category 카테고리 조건
     * @return BooleanBuilder에 상태와 변환 상태 조건을 추가한 빌더
     */
    private BooleanBuilder createBaseCondition(String category) {

        BooleanBuilder builder = new BooleanBuilder();

        if (Objects.nonNull(category) && !category.equalsIgnoreCase("ALL")) {
            addCategoryCondition(builder, category, article.category::eq);
        }
        builder.and(article.activationStatus.eq(ActivationStatus.ACTIVE));
        builder.and(article.conversionStatus.eq(ConversionStatus.SUCCESS));

        return builder;

    }

    /**
     * 쿼리를 실행하고 Slice로 반환하는 메서드
     * @param builder BooleanBuilder에 추가된 조건
     * @param pageable 페이징 정보
     * @return Slice<Article>
     */
    private Slice<Article> executeQuery(BooleanBuilder builder, Pageable pageable) {

        List<Article> content = jpaQueryFactory
                .selectFrom(article)
                .join(article.press).fetchJoin()
                .where(builder)
                .orderBy(new OrderSpecifier<>(Order.DESC, article.sourceCreatedAt))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .fetch();

        boolean hasNext = content.size() > pageable.getPageSize();

        if (hasNext) {
            content.remove(content.size() - 1);
        }

        return new SliceImpl<>(content, pageable, hasNext);

    }

    private <T> void addCategoryCondition(BooleanBuilder builder, String value, Function<CategoryType , BooleanExpression> condition) {
        builder.and(condition.apply(CategoryType.convertToEnum(value)));
    }

}
