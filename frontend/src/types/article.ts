export interface ProgressBarProps {
  progress: number;
  isPlaying: boolean;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export interface ScrapModalProps extends ModalProps {
  onCreateModalOpen: () => void;
}

export interface ArticleVideoProp {
  src: string;
  setIsModalOpen: (isOpen: boolean) => void;
}

interface ArticleLike {
  isLike: boolean;
  likeCount: number;
}

export interface ArticleButtonsProp {
  likeInfo: ArticleLike;
  dislikeInfo: ArticleLike;
  handleScrapClick: () => void;
  handleReportClick: () => void;
}
