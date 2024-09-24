export interface ProgressBarProps {
  progress: number;
  isPlaying: boolean;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export interface MiddleModalProps extends ModalProps {
  modalTitle: string;
}

export interface ScrapModalProps extends ModalProps {
  onCreateModalOpen: () => void;
}

export interface ArticleVideoProp {
  src: string;
  setIsModalOpen: (isOpen: boolean) => void;
}

export interface ArticleButtonsProp {
  handleScrapClick: () => void;
  handleReportClick: () => void;
}

export interface ReportModalProp {
  submitValue: string;
  setSubmitValue: (submitValue: string) => void;
}

export interface CreateScrapModalProps extends ReportModalProp {
  isOpen: boolean;
}
