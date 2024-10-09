import { Category, SliceDetails } from 'types/api/article';
import { EsContentInfo } from '../api/search';

export interface ArticleListCardProps {
  thumbnailUrl: string;
  title: string;
  viewCount: number;
  pressName: string;
  id: number;
  width?: string;
  height?: string;
}

export interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  isPressPage?: boolean;
  bgColor?: string;
  setParentSticky?: (isSticky: boolean) => void;
}

export interface ArticleListCardGroupProps {
  articleList?: ArticleListCardProps[];
  resultList?: EsContentInfo[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  sectionType?: string;
  sliceDetails?: SliceDetails | {};
}
