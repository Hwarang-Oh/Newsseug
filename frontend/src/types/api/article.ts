import { ArticleListCardProps } from 'types/common/common';

interface SliceDetails {
  currentPage: number;
  hasFirst: boolean;
  hasNext: boolean;
}

/**
 * IMP : Section Type
 */
export const SectionTypeMatch = {
  today: '오늘의 기사',
  age: '연령별 기사',
  all: '전체 기사',
};
export type SectionType = keyof typeof SectionTypeMatch;

/**
 * IMP : Category Enum Type
 */
export enum Category {
  '전체' = 'ALL',
  '정치' = 'POLITICS',
  '경제' = 'ECONOMY',
  '국제' = 'WORLD',
  '사건' = 'ACCIDENT',
  '과학' = 'SCIENCE',
  '사회' = 'SOCIETY',
  '스포츠' = 'SPORTS',
}

/**
 * IMP : 페이지별로 Article을 Fetch하는 Params
 * @param category : default = 'ALL'
 * @param page : default = 1
 */
export interface PageParamsType {
  category?: Category | string;
  page: number;
}

/**
 * IMP : 페이지별로 Article을 Fetch하는 Response Type
 * @param sliceDetails : 페이지별로 Slice된 정보
 * @param content : ArticleListCardProps[] : ArticleListCardProps의 배열
 */
export interface PageType {
  sliceDetails: SliceDetails;
  content: ArticleListCardProps[];
}

export interface SectionState {
  articleList: ArticleListCardProps[];
  sliceDetails: SliceDetails;
  sectionType: SectionType;
}
