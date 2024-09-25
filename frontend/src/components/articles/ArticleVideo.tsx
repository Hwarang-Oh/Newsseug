import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ArticleInfo from 'components/articles/ArticleInfo';
import ProgressBar from 'components/articles/ProgressBar';
import ScrapModal from 'components/articles/ScrapModal';
import ArticleButtons from 'components/articles/ArticleButtons';
import playIcon from 'assets/playIcon.svg';
import { ArticleVideoProp } from 'types/article';
import MiddleModal from 'components/articles/MiddleModal';

const likeInfo = {
  isLike: false,
  likeCount: 10,
};

const dislikeInfo = {
  isLike: false,
  likeCount: 1000,
};

function ArticleVideo({ src, setIsModalOpen }: ArticleVideoProp) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const [isScrapModalOpen, setIsScrapModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(isScrapModalOpen || isCreateModalOpen || isReportModalOpen);
  }, [setIsModalOpen, isCreateModalOpen, isScrapModalOpen, isReportModalOpen]);

  const handleScrapClick = () => {
    setIsScrapModalOpen((prev) => !prev);
  };

  const handleReportClick = () => {
    setIsReportModalOpen((prev) => !prev);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress(currentTime / duration);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime =
        parseFloat(event.target.value) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(event.target.value));
    }
  };
  return (
    <Container>
      <VideoWrapper>
        <ShrotForm
          muted
          autoPlay
          playsInline
          loop
          src={src}
          ref={videoRef}
          onClick={togglePlay}
          onTimeUpdate={updateProgress}
        />
        {!isPlaying && (
          <PlayButton onClick={togglePlay}>
            <img src={playIcon} alt="play icon" />
          </PlayButton>
        )}
        <ArticleButtons
          likeInfo={likeInfo}
          dislikeInfo={dislikeInfo}
          handleScrapClick={handleScrapClick}
          handleReportClick={handleReportClick}
        />
        {isScrapModalOpen && (
          <ScrapModal
            isOpen={isScrapModalOpen}
            onRequestClose={() => setIsScrapModalOpen(false)}
            onCreateModalOpen={() => {
              setIsScrapModalOpen(false);
              setIsCreateModalOpen(true);
            }}
          />
        )}
        {isCreateModalOpen && (
          <MiddleModal
            isOpen={isCreateModalOpen}
            onRequestClose={() => {
              setIsScrapModalOpen(true);
              setIsCreateModalOpen(false);
            }}
            modalTitle="새 폴더 생성"
          />
        )}
        {isReportModalOpen && (
          <MiddleModal
            isOpen={isReportModalOpen}
            onRequestClose={() => {
              setIsReportModalOpen(false);
            }}
            modalTitle="동영상 신고하기"
          />
        )}
      </VideoWrapper>
      <ArticleContainer>
        <ArticleInfo />
        <ProgressBar
          progress={progress}
          isPlaying={isPlaying}
          onSeek={handleSeek}
        />
      </ArticleContainer>
    </Container>
  );
}

export default ArticleVideo;

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
  background-color: ${({ theme }) => theme.textColor};
`;

const ShrotForm = styled.video`
  width: 100%;
  object-fit: cover;
`;

const VideoWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArticleContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 4.5%,
    rgba(0, 0, 0, 0.8) 68%,
    rgba(0, 0, 0, 0.9) 100%
  );
`;

const PlayButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
