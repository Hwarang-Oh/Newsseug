import { Article } from './article';

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
  articles: Article[];
  id: number;
  title: string;
}
