package com.a301.newsseug.domain.press.model.dto;

import java.util.ArrayList;
import java.util.List;

import com.a301.newsseug.domain.press.model.entity.PressBranding;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GetPressBrandingResponseDto {
	private List<PressBranding> pressBranding;
}
