import styled from 'styled-components';
import ArticleSlider from 'components/articles/ArticleSlider';
import { useEffect } from 'react';
import ArticleHeader from 'components/articles/ArticleHeader';

function Article() {
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

  return (
    <Container id="container">
      <ArticleHeader />
      <ArticleSlider />
    </Container>
  );
}

export default Article;

const Container = styled.div`
  position: relative;
`;
