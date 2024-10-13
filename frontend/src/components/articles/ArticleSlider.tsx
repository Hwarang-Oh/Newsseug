import 'swiper/css';
import 'swiper/css/mousewheel';
import styled from 'styled-components';
// import styled, { keyframes } from 'styled-components'; In Case of Using Keyframes
import Spinner from '../common/Spinner';
import ArticleVideo from 'components/articles/ArticleVideo';
import SwiperCore, { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Keyboard, History } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/index';
import { useLoadNextPage } from 'hooks/useLoadNextPage';
import { ArticleVideo as ArticleVideoType } from 'types/api/articleVideo';
import { fetchEachArticle } from 'apis/articleVideoApi';

interface ArticleInfoType {
  id: number;
  thumbnailUrl: string;
}

function ArticleSlider() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [videoList, setVideoList] = useState<{
  //   [id: number]: ArticleVideoType;
  // }>({});

  const [videoData, setVideoData] = useState<ArticleVideoType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const setHeight = () => {
      const containerElement = document.getElementById('container');
      if (containerElement) {
        containerElement.style.height = `${window.innerHeight}px`;
      }
    };

    setHeight();
    window.addEventListener('resize', setHeight);

    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = !isModalOpen;
    }
  }, [isModalOpen]);

  const { sliceDetails, articlesInfo } = useSelector(
    (state: RootState) => state.articles,
  );
  const { articleId } = useParams<{ articleId: string }>();

  const slideIndex = articlesInfo.findIndex(
    (article: ArticleInfoType) => article.id === Number(articleId),
  );

  const [activeIndex, setActiveIndex] = useState(slideIndex);
  const loadNextPage = useLoadNextPage();

  useEffect(() => {
    setIsLoading(true);

    const fetchVideos = async () => {
      const video = await fetchEachArticle(articlesInfo[activeIndex].id);
      setVideoData(video);
      setIsLoading(false);
    };

    fetchVideos();
  }, [activeIndex]);

  return (
    <Container id="container">
      <Swiper
        modules={[Mousewheel, Keyboard, History]}
        spaceBetween={0}
        slidesPerView={1}
        direction={'vertical'}
        keyboard={{ enabled: true, pageUpDown: true }}
        history={{
          enabled: true,
          key: 'articles',
          replaceState: true,
        }}
        initialSlide={slideIndex}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper: SwiperType) => {
          handleSlideChange(swiper);
          if (
            swiper.activeIndex >= articlesInfo.length - 3 &&
            sliceDetails.hasNext
          ) {
            loadNextPage();
          }
        }}
      >
        {articlesInfo.map((articleInfo: ArticleInfoType, index: number) => {
          const startIndex = Math.max(activeIndex - 1);
          const endIndex = Math.min(activeIndex + 1);
          if (isLoading || !videoData) {
            return (
              <SwiperSlide
                key={`${articleId}-${index}`}
                data-history={articleInfo.id}
              >
                <ModalOverlay>
                  <Spinner height="100vh" />
                </ModalOverlay>
              </SwiperSlide>
            );
          }

          if (index === startIndex || index === endIndex) {
            return (
              <SwiperSlide
                key={`${articleId}-${index}`}
                data-history={articleInfo.id}
              >
                <ImgContainer>
                  <Thumnail src={articleInfo.thumbnailUrl} />
                </ImgContainer>
              </SwiperSlide>
            );
          }

          if (index !== activeIndex) {
            return (
              <SwiperSlide
                key={`${articleId}-${index}`}
                data-history={articleInfo.id}
              />
            );
          }

          return (
            <SwiperSlide
              key={`${articleId}-${index}`}
              data-history={articleInfo.id}
            >
              <ArticleVideo
                articleInfo={videoData}
                thumbnailUrl={articleInfo.thumbnailUrl}
                setIsModalOpen={setIsModalOpen}
                isPlaying={index === activeIndex}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Container>
  );
}

export default ArticleSlider;

const Container = styled.div`
  width: 100%;
  height: 100%;

  .swiper {
    width: 100%;
    height: 100%;
  }

  box-shadow:
    100px 0 100px -50px ${({ theme }) => theme.textColor + '25'},
    -100px 0 100px -50px ${({ theme }) => theme.textColor + '25'};
`;

const ModalOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 500px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  box-shadow:
    100px 0 100px -50px ${({ theme }) => theme.textColor + '25'},
    -100px 0 100px -50px ${({ theme }) => theme.textColor + '25'};
`;

const ImgContainer = styled.div`
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

const Thumnail = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100vh;
  transform: translate(-50%, -50%);
  object-fit: cover;
`;
