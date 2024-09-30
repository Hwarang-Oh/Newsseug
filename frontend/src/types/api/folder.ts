import { ArticleListCardProps } from 'types/common/common';
export interface MemberFolderInfo {
  id: number;
  title: string;
  articleCount: number;
  thumbnailUrl: string;
}

export interface MemberFolderList {
  folders: MemberFolderInfo[];
}
export interface FolderDetail {
  articles: ArticleListCardProps[];
  id: number;
  title: string;
}
