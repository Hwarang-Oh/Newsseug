import { ArticleListCardProps } from 'types/common/common';

export interface SectionProps {
  subTitle: string;
  moreLink: () => void;
  articleList: ArticleListCardProps[];
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export interface SubTitleProps {
  subTitle: string;
  moreLink: () => void;
}

export interface AllArticlesProps {
  pageTitle?: string;
  articleList?: ArticleListCardProps[];
}
