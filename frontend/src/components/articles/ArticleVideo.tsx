import styled from 'styled-components';
import ArticleDetailInfo from 'components/articles/ArticleDetailInfo';
import ProgressBar from 'components/articles/ProgressBar';
import ScrapModal from 'components/articles/ScrapModal';
import ArticleButtons from 'components/articles/ArticleButtons';
import playIcon from 'assets/playIcon.svg';
import CreateScrapModal from './CreateScrapModal';
import ReportModal from './ReportModal';
import { useEffect, useRef, useState } from 'react';
import { ArticleVideoProp } from 'types/props/articleVideo';
import { AnimatePresence } from 'framer-motion';
import LoginModal from '../login/LoginModal';
import { getCookie, setCookie } from 'utils/stateUtils';
import { useLocation, useNavigate } from 'react-router-dom';

function ArticleVideo({
  articleInfo,
  thumbnailUrl,
  setIsModalOpen,
  isPlaying,
}: Readonly<ArticleVideoProp>) {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [isNowPlaying, setIsNowPlaying] = useState(isPlaying);

  const [isScrapModalOpen, setIsScrapModalOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsModalOpen(
      isScrapModalOpen ||
        isCreateModalOpen ||
        isReportModalOpen ||
        isLoginModalOpen,
    );
  }, [
    setIsModalOpen,
    isCreateModalOpen,
    isScrapModalOpen,
    isReportModalOpen,
    isLoginModalOpen,
  ]);

  const isAuthenticated = () => {
    const token = getCookie('AccessToken');
    return !!token; // 토큰이 있으면 true, 없으면 false
  };

  const handleScrapClick = () => {
    if (!isAuthenticated()) {
      handleButtonClickWithoutLogin();
      return;
    }
    setIsScrapModalOpen((prev) => !prev);
  };

  const handleReportClick = () => {
    if (!isAuthenticated()) {
      handleButtonClickWithoutLogin();
      return;
    }
    setIsReportModalOpen((prev) => !prev);
  };

  const handleButtonClickWithoutLogin = () => {
    setIsLoginModalOpen((prev) => !prev);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        setIsNowPlaying(true);
      } else {
        setIsNowPlaying(false);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      if (isNowPlaying) {
        videoRef.current.play().catch((error) => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isNowPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isNowPlaying) {
        setIsNowPlaying(false);
      } else {
        setIsNowPlaying(true);
      }
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

  const handleLogin = () => {
    setIsLoginModalOpen(false);
    setCookie('redirect', location.pathname, { maxAge: 60 });
    navigate('/login');
  };

  return (
    <Container className="container">
      <VideoWrapper>
        <ShortForm
          className="shortform"
          playsInline
          loop
          src={articleInfo.article.videoUrl}
          poster={thumbnailUrl ?? '예시 이미지'}
          ref={videoRef}
          onClick={togglePlay}
          onTimeUpdate={updateProgress}
        />
        {!isNowPlaying && (
          <PlayButton onClick={togglePlay}>
            <img src={playIcon} alt="play icon" />
          </PlayButton>
        )}
        <ArticleButtons
          articleId={articleInfo.article.id}
          likeInfo={articleInfo.likeInfo}
          hateInfo={articleInfo.hateInfo}
          handleScrapClick={handleScrapClick}
          handleReportClick={handleReportClick}
          handleButtonClickWithoutLogin={handleButtonClickWithoutLogin}
        />
        <AnimatePresence>
          {isScrapModalOpen && (
            <ScrapModal
              articleId={articleInfo.article.id}
              isOpen={isScrapModalOpen}
              onRequestClose={() => setIsScrapModalOpen(false)}
              onCreateModalOpen={() => {
                setIsScrapModalOpen(false);
                setIsCreateModalOpen(true);
              }}
            />
          )}
        </AnimatePresence>
        {isCreateModalOpen && (
          <CreateScrapModal
            isOpen={isCreateModalOpen}
            onRequestClose={() => {
              setIsScrapModalOpen(true);
              setIsCreateModalOpen(false);
            }}
          />
        )}
        {isReportModalOpen && (
          <ReportModal
            articleId={articleInfo.article.id}
            isOpen={isReportModalOpen}
            onRequestClose={() => setIsReportModalOpen(false)}
          />
        )}
        {isLoginModalOpen && (
          <LoginModal
            isVideo={true}
            onCancel={handleButtonClickWithoutLogin}
            onLogin={handleLogin}
          />
        )}
      </VideoWrapper>
      <ArticleContainer>
        <ArticleDetailInfo
          articleInfo={articleInfo}
          handleButtonClickWithoutLogin={handleButtonClickWithoutLogin}
        />
        <ProgressBar
          progress={progress}
          isPlaying={isNowPlaying}
          onSeek={handleSeek}
        />
      </ArticleContainer>
    </Container>
  );
}

export default ArticleVideo;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  z-index: 1;
  position: relative;
  background-color: #000;
  display: flex;
  align-items: center;
`;

// const ShortForm = styled.video`
//   width: auto;
//   height: 100vh;
//   object-fit: cover;
//   /* overflow: hidden; 여분의 영역 숨기기 */
// `;

const ShortForm = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;

const VideoWrapper = styled.div`
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
  padding-bottom: 20px;
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
