import styled from 'styled-components';
import ArticleSlideBox from '../home/ArticleSlideBox';
import article from 'mocks/articlecategorydummy.json';

function Histories() {
  const width = '120px';
  const height = '160px';
  return <ArticleSlideBox articleList={article.targetArticles} />;
}

export default Histories;

const Wrapper = styled.div`
  display: flex;
  width: 100%; /* 부모 요소의 너비에 맞춤 */
  max-width: 100%; /* 최대 부모 요소의 너비만큼 차지 */
  align-items: flex-start;
  gap: 8px;
  overflow-x: auto; /* x축 스크롤 가능 */
  white-space: nowrap; /* 자식 요소들이 줄바꿈되지 않도록 설정 */
  scroll-behavior: smooth; /* 부드러운 스크롤 */

  & > * {
    flex-shrink: 0; /* 자식 요소가 축소되지 않도록 설정 */
  }

  /* 스크롤 바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  &::-webkit-scrollbar-track {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }
  -ms-overflow-style: none;
`;
