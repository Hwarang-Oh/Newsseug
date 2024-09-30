import styled, { keyframes } from 'styled-components';
import ArticleListCard from 'components/common/ArticleListCard';
import { useRef, useEffect } from 'react';
import { ArticleListCardGroupProps } from 'types/common/common';

/**
 * IMP : ArticleSlideBox Component ( Article Slide Box ) => 가로 슬라이드로 넘어가는 뉴스 기사
 * @param param0
 * @returns
 */
function ArticleSlideBox({
  articleList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Readonly<ArticleListCardGroupProps>) {
  const slideBoxRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasNextPage || !observerRef.current || !slideBoxRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          if (fetchNextPage) fetchNextPage();
        }
      },
      {
        root: slideBoxRef.current,
        threshold: 1.0,
      },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <ArticleSlideBoxStyle ref={slideBoxRef}>
      {articleList.map((article, index) => (
        <ArticleListCard key={index} {...article} />
      ))}
      <div ref={observerRef} style={{ width: '1px', height: '1px' }}>
        {isFetchingNextPage && <LoadingIndicator></LoadingIndicator>}
      </div>
    </ArticleSlideBoxStyle>
  );
}
export default ArticleSlideBox;

const ArticleSlideBoxStyle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding-bottom: 24px;
  overflow-x: auto;
  & > * {
    flex-shrink: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
// TODO : Loading 제대로 구현하기

const spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingIndicator = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid rgba(195, 195, 195, 0.6);
  border-radius: 50%;
  border-top-color: #636767;
  animation: ${spinner} 0.6s linear infinite;
  margin: 0 auto;
`;
