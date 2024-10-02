import { ArticleListCardProps } from 'types/common/common';

export interface FolderBasic {
  id: number;
  title: string;
  thumbnailUrl: string;
}

export interface MemberFolderInfo extends FolderBasic {
  articleCount: number;
}

export interface FolderDetail {
  articles: ArticleListCardProps[];
  id: number;
  title: string;
}

export interface FolderInfo extends FolderBasic {
  articles: number[];
}

export interface MemberFolderState {
  folders: MemberFolderInfo[];
}
