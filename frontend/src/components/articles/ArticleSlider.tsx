import styled from 'styled-components';
import { Mousewheel, Keyboard, History } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/mousewheel';
import ArticleVideo from 'components/articles/ArticleVideo';
import { useEffect, useRef, useState } from 'react';

const videos = [
  { id: 1, src: '/shorts/output.mp4' },
  { id: 2, src: '/shorts/short1.mp4' },
  { id: 3, src: '/shorts/short2.mp4' },
];
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
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper; // Swiper 인스턴스 저장
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id} data-history={video.id}>
            <ArticleVideo src={video.src} setIsModalOpen={setIsModalOpen} />
          </SwiperSlide>
        ))}
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
