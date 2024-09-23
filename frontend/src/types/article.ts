export interface ProgressBarProps {
  progress: number;
  isPlaying: boolean;
  onSeek: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ScrapModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
