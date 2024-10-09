import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ProgressBarProps } from 'types/props/articleVideo';

function ProgressBar({
  progress,
  isPlaying,
  onSeek,
}: Readonly<ProgressBarProps>) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress * 100}%`;
    }
  }, [progress]);
  return (
    <ProgressSection $isPlaying={isPlaying}>
      <ProgressBarWrap>
        <ProgressBarFill ref={progressBarRef} />
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
  transition: 0.3s;
`;

const ProgressBarWrap = styled.div`
  position: relative;
  background: ${({ theme }) => theme.relaxColor.dark};
  height: 5px;
  cursor: pointer;
`;

const ProgressBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
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
    width: 15px;
    height: 15px;
    background-color: ${({ theme }) => theme.bgColor};
    border-radius: 50%;
    cursor: pointer;
  }
`;
