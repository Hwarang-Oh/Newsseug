package com.a301.newsseug.domain.article.repository;

import static com.a301.newsseug.domain.article.model.entity.QArticle.article;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.article.model.entity.type.CategoryType;
import com.a301.newsseug.domain.press.model.entity.Press;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ArticleCustomRepositoryImpl implements ArticleCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Slice<Article> findAllByPressAndCategory(Press press, String category, Pageable pageable) {

        BooleanBuilder builder = new BooleanBuilder();
        addCategoryCondition(builder, category, article.category::eq);

        List<Article> content = jpaQueryFactory
                .selectFrom(article)
                .join(article.press).fetchJoin()
                .where(builder)
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
        if (Objects.nonNull(value)) {
            builder.and(condition.apply(CategoryType.convertToEnum(value)));
        }
    }

}
