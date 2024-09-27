import styled from 'styled-components';
import ArticleSlider from 'components/articles/ArticleSlider';
import ArticleHeader from 'components/articles/ArticleHeader';
import { useEffect } from 'react';

function ArticleVideo() {
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

  return (
    <Container id="container">
      <ArticleHeader />
      <ArticleSlider />
    </Container>
  );
}

export default ArticleVideo;

const Container = styled.div`
  position: relative;
`;
