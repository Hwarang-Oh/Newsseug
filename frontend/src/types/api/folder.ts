import { ArticleListCardProps } from 'types/common/common';
import { SliceDetails } from './article';

export interface FolderBasic {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface MemberFolderInfo extends FolderBasic {
  articleCount: number;
}

export interface FolderArticles {
  sliceDetails: SliceDetails;
  content: ArticleListCardProps[];
}

export interface FolderDetail {
  articles: FolderArticles;
  id: number;
  title: string;
}

export interface FolderInfo extends FolderBasic {
  articles: number[];
}

export interface MemberFolderState {
  folders: MemberFolderInfo[];
}
