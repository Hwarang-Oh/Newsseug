import styled, { keyframes } from 'styled-components';
import ArticleListCard from 'components/common/ArticleListCard';
import { useRef, useEffect } from 'react';
import { ArticleListCardGroupProps } from 'types/common/common';

/**
 * IMP : ArticleListCardGroup ( News Card Group ) Component
 * @param param0
 * @returns
 */
function ArticleListCardGroup({
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
        root: null,
        threshold: 1.0,
      },
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <Container ref={slideBoxRef}>
      {articleList.map((article) => (
        <ArticleListCard
          key={article.id}
          thumbnailUrl={article.thumbnailUrl}
          title={article.title}
          viewCount={article.viewCount}
          pressName={article.pressName}
          id={article.id}
          width="100%"
        />
      ))}
      <LoadingContainer ref={observerRef}>
        {isFetchingNextPage && <LoadingIndicator></LoadingIndicator>}
      </LoadingContainer>
    </Container>
  );
}

export default ArticleListCardGroup;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: auto;
  & > * {
    flex: 1 1 calc(50% - 8px);
    flex-shrink: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  align-self: center;
  justify-content: center;
`;

const Spinner = keyframes`
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
  animation: ${Spinner} 0.6s linear infinite;
  margin: 0 auto;
`;
