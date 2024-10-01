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
    <Container ref={slideBoxRef}>
      {articleList.map((article) => (
        <ArticleListCard
          key={article.id}
          thumbnailUrl={article.thumbnailUrl}
          title={article.title}
          viewCount={article.viewCount}
          pressName={article.pressName}
          id={article.id}
          createdAt={article.createdAt}
          width="100%"
        />
      ))}
      <div ref={observerRef}></div>
    </Container>
  );
}

export default ArticleListCardGroup;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  height: 100vh;
  overflow-y: auto;
  & > * {
    flex-shrink: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
