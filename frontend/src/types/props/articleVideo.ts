import { HateInfo, LikeInfo } from '../api/articleVideo';

export interface ProgressBarProps {
  progress: number;
  isPlaying: boolean;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  // articleId: number;
  isOpen: boolean;
  onRequestClose: () => void;
}

export interface ScrapModalProps extends ModalProps {
  onCreateModalOpen: () => void;
}

export interface ArticleVideoProp {
  articleId: number;
  src: string;
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface ArticleButtonsProp {
  articleId: number;
  likeInfo: LikeInfo;
  hateInfo: HateInfo;
  handleScrapClick: () => void;
  handleReportClick: () => void;
}
