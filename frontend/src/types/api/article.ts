import { ArticleListCardProps } from 'types/common/common';

interface SliceDetails {
  currentPage: number;
  hasFirst: boolean;
  hasNext: boolean;
}

export interface PageType {
  sliceDetails: SliceDetails;
  content: ArticleListCardProps[];
}
