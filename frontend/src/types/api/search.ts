import { InputSectionProps } from 'types/props/search';
import { PressDetail } from './press';
import { Category, PageType, SliceDetails } from './article';
import { ArticleListCardProps } from '../common/common';

export interface SearchApiParams extends InputSectionProps {
  pageNumber: number;
  category?: Category | string;
}

export interface SearchResultInfo {
  press: PressDetail[];
  articles: PageType;
}

export interface EsContentInfo extends ArticleListCardProps, PressDetail {
  type: string;
}

export interface EsSearchResultInfo {
  sliceDetails: SliceDetails;
  content: EsContentInfo[];
}
