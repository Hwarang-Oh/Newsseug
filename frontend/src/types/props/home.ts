import { ArticleListCardProps } from 'types/common/common';

export interface SectionProps {
  subTitle: string;
  moreLink: string;
  articleList?: ArticleListCardProps[];
}

export interface SubTitleProps {
  subTitle: string;
  moreLink: string;
}

export interface ArticleSlideBoxProps {
  articleList?: ArticleListCardProps[];
}

export interface AllArticlesProps {
  pageTitle?: string;
  articleList?: ArticleListCardProps[];
}
