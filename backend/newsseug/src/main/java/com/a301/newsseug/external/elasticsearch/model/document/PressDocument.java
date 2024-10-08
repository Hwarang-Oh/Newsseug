package com.a301.newsseug.external.elasticsearch.model.document;

import com.a301.newsseug.domain.press.model.entity.Press;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PressDocument {

    @Field(type = FieldType.Long)
    private Long id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String imageUrl;

    @Field(type = FieldType.Text)
    private String description;

    public static PressDocument of(Press press) {
        return PressDocument.builder()
                .id(press.getPressId())
                .name(press.getPressBranding().getName())
                .build();
    }

}
