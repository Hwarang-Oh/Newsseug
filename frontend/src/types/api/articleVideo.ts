import { PressBasic } from 'types/api/press';

export interface ArticleInfo {
  id: number;
  title: string;
  sourceUrl: string;
  videoUrl: string;
  createdAt: string;
}

export interface LikeInfo {
  isLike: boolean;
  likeCount: number;
}

export interface HateInfo {
  isHate: boolean;
  hateCount: number;
}

export interface ArticleVideo {
  article: ArticleInfo;
  press: PressBasic;
  likeInfo: LikeInfo;
  hateInfo: HateInfo;
}
