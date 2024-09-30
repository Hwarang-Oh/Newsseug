import { ArticleListCardProps } from 'types/common/common';

export interface SectionProps {
  subTitle: string;
  moreLink: string;
  articleList: ArticleListCardProps[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export interface SubTitleProps {
  subTitle: string;
  moreLink: string;
}

export interface AllArticlesProps {
  pageTitle?: string;
  articleList?: ArticleListCardProps[];
}
