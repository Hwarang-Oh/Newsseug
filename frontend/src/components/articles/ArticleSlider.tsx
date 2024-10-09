import styled from 'styled-components';
import { Mousewheel, Keyboard, History } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/mousewheel';
import ArticleVideo from 'components/articles/ArticleVideo';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/index';
import { useLoadNextPage } from 'hooks/useLoadNextPage';
import { useFetchVideos } from 'hooks/useFecthVideos';

function ArticleSlider() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0); // 현재 슬라이드 인덱스 상태 추가
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex); // 현재 슬라이드 인덱스 업데이트
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

  const { articleIds, sliceDetails, videoList } = useSelector(
    (state: RootState) => state.articles,
  );
  const { articleId } = useParams<{ articleId: string }>();

  const slideIndex = articleIds.findIndex(
    (id: number) => id === Number(articleId),
  );

  const loadNextPage = useLoadNextPage();
  const fetchVideos = useFetchVideos();

  useEffect(() => {
    fetchVideos();
  }, [articleIds]);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const hasUnloadedVideos = articleIds.some(
      (id: number) => !videoList.hasOwnProperty(id),
    );
    setIsLoading(hasUnloadedVideos);
  }, [videoList, articleIds]);

  if (isLoading) return <div>loading...</div>;

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
          swiperRef.current = swiper; // Swiper 인스턴스 저장
        }}
        onSlideChange={(swiper: SwiperType) => {
          handleSlideChange(swiper); // 슬라이드 변경 시 현재 인덱스 업데이트
          if (
            swiper.activeIndex >= articleIds.length - 3 &&
            sliceDetails.hasNext
          ) {
            loadNextPage();
            fetchVideos();
          }
        }}
      >
        {articleIds.map((articleId: number, index: number) => {
          const video = videoList[articleId];
          if (!video) {
            return (
              <SwiperSlide key={articleId} data-history={articleId}>
                <div>Loading video...</div>
              </SwiperSlide>
            );
          }
          return (
            <SwiperSlide key={video.article.id} data-history={video.article.id}>
              <ArticleVideo
                articleInfo={video}
                setIsModalOpen={setIsModalOpen}
                isPlaying={index === activeIndex} // 현재 슬라이드만 재생
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

  box-shadow: 0 0 100px ${({ theme }) => theme.textColor + '25'};
`;
