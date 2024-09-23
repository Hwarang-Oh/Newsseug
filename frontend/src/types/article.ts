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
