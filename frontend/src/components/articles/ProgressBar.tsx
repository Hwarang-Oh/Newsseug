import styled from 'styled-components';
import { ProgressBarProps } from '@/types/article';

function ProgressBar({ progress, isPlaying, onSeek }: ProgressBarProps) {
  return (
    <ProgressSection $isPlaying={isPlaying}>
      <ProgressBarWrap>
        <ProgressBarFill $progress={progress} />
        {!isPlaying && (
          <ProgressInput
            type="range"
            min="0"
            max="1"
            step="any"
            value={progress}
            onChange={onSeek}
          />
        )}
      </ProgressBarWrap>
    </ProgressSection>
  );
}

export default ProgressBar;

const ProgressSection = styled.div<{ $isPlaying: boolean }>`
  padding: ${({ $isPlaying }) => ($isPlaying ? '0' : '0 10px 16px')};
`;

const ProgressBarWrap = styled.div`
  position: relative;
  background: #848484;
  height: 5px;
  cursor: pointer;
`;

const ProgressBarFill = styled.div<{ $progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $progress }) => `${$progress * 100}%`};
  background: ${({ theme }) => theme.mainColor};
  height: 100%;
`;

const ProgressInput = styled.input`
  position: absolute;
  margin: 0;
  height: 5px;
  width: 100%;
  background: transparent;
  -webkit-appearance: none;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px; /* Customize size */
    height: 15px; /* Customize size */
    background-color: white; /* Set thumb color */
    border-radius: 50%;
    cursor: pointer;
  }
`;
