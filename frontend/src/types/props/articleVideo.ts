import { ArticleVideo, HateInfo, LikeInfo } from '../api/articleVideo';

export interface ProgressBarProps {
  progress: number;
  isPlaying: boolean;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalBasicProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export interface ModalProps extends ModalBasicProps {
  articleId: number;
}

export interface ScrapModalProps extends ModalProps {
  onCreateModalOpen: () => void;
}

export interface ArticleVideoProp {
  articleInfo: ArticleVideo;
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface ArticleButtonsProp {
  articleId: number;
  likeInfo: LikeInfo;
  hateInfo: HateInfo;
  handleScrapClick: () => void;
  handleReportClick: () => void;
}
