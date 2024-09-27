export interface SubTitleProps {
  title: string;
  url?: string;
}

export interface FolderProps {
  width?: string;
  height?: string;
  thumbnailUrl: string;
  folderTitle: string;
  folderCnt: number;
  onClick?: () => void;
}
