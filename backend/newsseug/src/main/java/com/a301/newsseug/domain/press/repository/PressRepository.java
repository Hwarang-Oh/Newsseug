package com.a301.newsseug.domain.press.repository;

import com.a301.newsseug.domain.press.exception.NotExistPressException;
import com.a301.newsseug.domain.press.model.entity.Press;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PressRepository extends JpaRepository<Press, Long> {

    default Press getOrThrow(Long id) {
        return findById(id).orElseThrow(NotExistPressException::new);
    }

    List<Press> findAllByPressBranding_NameIsContainingIgnoreCase(String keyword);

}