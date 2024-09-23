package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.interaction.model.entity.Hate;
import org.springframework.data.repository.CrudRepository;

public interface HateRepository extends CrudRepository<Hate, Long> {
}
