package com.a301.newsseug.external.elasticsearch.model.document;

import com.a301.newsseug.domain.article.model.entity.Article;
import com.a301.newsseug.domain.press.model.entity.Press;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "press_and_article")
public class PressAndArticleDocument {

    @Id
    private String id;

    @Field(type = FieldType.Keyword)
    private String type;

    @Field(type = FieldType.Dense_Vector, dims = 768)
    private float[] vector;

    @Field(type = FieldType.Object)
    private PressDocument press;

    @Field(type = FieldType.Object)
    private ArticleDocument article;

    @Builder
    public PressAndArticleDocument(Press press) {
        this.type = press.getClass().getSimpleName();
        this.vector = new float[768];
        this.press = PressDocument.of(press);
    }

    @Builder
    public PressAndArticleDocument(Article article) {
        this.type = article.getClass().getSimpleName();
        this.vector = new float[768];
        this.article = ArticleDocument.of(article);
    }

}
