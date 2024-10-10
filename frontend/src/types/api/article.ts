import { ArticleListCardProps } from 'types/common/common';

export interface SliceDetails {
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
 * @param pressId : default = null
 */
export interface PageParamsType {
  category?: Category | string;
  page: number;
  pressId?: number | null;
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

/**
 * IMP : Allarticle에게 넘겨주는 Section State 상태 ( 동적 Page 구성을 위한 상태 )
 * @param articleList : ArticleListCardProps[] : ArticleListCardProps의 배열
 * @param queryKey : string[] : Query Key
 * @param sliceDetails : SliceDetails : Slice된 정보
 * @param sectionType : SectionType : Section Type
 */
export interface SectionState {
  articleList: ArticleListCardProps[];
  queryKey: string[];
  sliceDetails: SliceDetails;
  sectionType: SectionType;
  title?: string;
}

/**
 * IMP : Contents Fetch Type
 */
export interface ContentsFetchType<T extends PageType> {
  queryKey: string[];
  fetchData: ({ category, page, pressId }: PageParamsType) => Promise<T>;
  category?: Category;
  pressId?: number | null;
  sectionType?: string;
  initialPage?: number;
  enabled?: boolean;
}
