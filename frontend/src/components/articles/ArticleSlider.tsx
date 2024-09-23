import styled from 'styled-components';
import { Mousewheel, Keyboard, History } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/mousewheel';
import ArticleVideo from 'components/articles/ArticleVideo';
import { useEffect } from 'react';

function ArticleSlider() {
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
  const videos = [
    { id: 1, src: '/shorts/short1.mp4' },
    { id: 2, src: '/shorts/short2.mp4' },
  ];
  return (
    <Container id="container">
      <Swiper
        modules={[Mousewheel, Keyboard, History]}
        spaceBetween={0}
        slidesPerView={1}
        direction={'vertical'}
        mousewheel={{ enabled: true }}
        keyboard={{ enabled: true, pageUpDown: true }}
        history={{
          enabled: true,
          key: 'articles',
          replaceState: true,
        }}
      >
        {videos.map((video) => (
          <SwiperSlide key={video.id} data-history={video.id}>
            <ArticleVideo src={video.src} />
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
