package com.a301.newsseug.external.elasticsearch.repository;

import com.a301.newsseug.external.elasticsearch.model.document.PressAndArticleDocument;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface PressAndArticleRepository extends ElasticsearchRepository<PressAndArticleDocument, Long> {

    @Query("""
    {
      "bool": {
        "must": [
          { "multi_match": { 
              "query": "?0", 
              "fields": ["article.pressName", "article.title", "press.name"]
          }}
        ],
        "should": [
          {
            "script_score": {
              "query": { "match_all": {} },
              "script": {
                "source": "cosineSimilarity(params.query_vector, 'vector') + 1.0",
                "params": { "query_vector": ?1 }
              }
            }
          }
        ]
      }
    }
    """)
    Slice<PressAndArticleDocument> searchByKeywordAndVector(String keyword, float[] queryVector, Pageable pageable);

}
