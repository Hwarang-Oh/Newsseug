package com.a301.newsseug.domain.interaction.repository;

import com.a301.newsseug.domain.interaction.model.entity.History;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HistoryRepository extends JpaRepository<History, Long> {
}
