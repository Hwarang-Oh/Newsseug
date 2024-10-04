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
import { ArticleVideo as ArticleVideoType } from 'types/api/articleVideo';

import { RootState } from '../../redux/index';
import { useLoadNextPage } from 'hooks/useLoadNextPage';
import { useFetchVideos } from 'hooks/useFecthVideos';

function ArticleSlider() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const swiperRef = useRef<SwiperCore | null>(null);
  useEffect(() => {
    // 페이지의 크기만큼 높이 지정
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
    // isModalOpen 상태에 따라 Swiper 인스턴스의 allowTouchMove 설정
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
          fetchVideos(swiper.activeIndex);
          if (
            swiper.activeIndex === articleIds.length - 3 &&
            sliceDetails.hasNext
          ) {
            loadNextPage(); // 다음 페이지 데이터를 가져옴
          }
        }}
      >
        {Object.values(videoList).map((videoInfo) => {
          const video = videoInfo as ArticleVideoType; // 명시적으로 타입 캐스팅
          return (
            <SwiperSlide key={video.article.id} data-history={video.article.id}>
              <ArticleVideo
                articleInfo={video}
                setIsModalOpen={setIsModalOpen}
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
`;
