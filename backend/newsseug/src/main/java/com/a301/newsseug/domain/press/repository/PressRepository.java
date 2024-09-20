package com.a301.newsseug.domain.press.repository;

import com.a301.newsseug.domain.press.model.entity.Press;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PressRepository extends JpaRepository<Press, Long> {
}