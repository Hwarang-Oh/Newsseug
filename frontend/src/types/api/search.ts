import { InputSectionProps } from 'types/props/search';
import { PressDetail } from './press';
import { Category, PageType } from './article';

export interface SearchApiParams extends InputSectionProps {
  pageNumber: number;
  category?: Category | string;
}

export interface SearchResultInfo {
  press: PressDetail[];
  articles: PageType;
}
