package com.a301.newsseug.domain.press.factory;

import org.springframework.test.util.ReflectionTestUtils;

import com.a301.newsseug.domain.press.model.entity.Press;

public class PressFactory {

	public static Press press(Long id) {

		Press press = Press.builder()
			.name("name")
			.description("description")
			.imageUrl("imageUrl")
			.build();

		ReflectionTestUtils.setField(press, "pressId", id);

		return press;
	}

}
