import { ArticleListCardProps } from 'types/common/common';
import { SliceDetails } from '../api/article';

export interface SectionProps {
  subTitle: string;
  moreLink: () => void;
  articleList: ArticleListCardProps[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  isLoading?: boolean;
  sectionType?: string;
  sliceDetails?: SliceDetails | {};
  isError?: boolean;
}

export interface SubTitleProps {
  subTitle: string;
  moreLink: () => void;
}

export interface AllArticlesProps {
  pageTitle?: string;
  articleList?: ArticleListCardProps[];
}
