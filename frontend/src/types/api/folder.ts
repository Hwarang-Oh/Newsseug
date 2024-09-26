export interface FolderList {
  folders: FolderInfo[];
}

export interface FolderInfo {
  id: number;
  name: string;
  articleCount: number;
}

export interface MemberFolderInfo extends FolderInfo {
  thumbnailUrl: string;
}

export interface MemberFolderList {
  folders: MemberFolderInfo[];
}

export interface FolderArticle {
  id: number;
  pressName: string;
  thumbnailUrl: string;
  title: string;
  viewCount: number;
  createdAt: string;
}

export interface Folder {
  articles: FolderArticle[];
  id: number;
  name: string;
}
