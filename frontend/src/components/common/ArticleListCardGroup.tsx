import styled, { keyframes, css } from 'styled-components';
import ArticleListCard from 'components/common/ArticleListCard';
import { useRef, useEffect } from 'react';
import { ArticleListCardGroupProps } from 'types/common/common';
import Spinner from './Spinner';
import PressCard from 'components/search/PressCard';

/**
 * IMP : ArticleListCardGroup ( News Card Group ) Component
 * @param param0
 * @returns
 **/

function ArticleListCardGroup({
  articleList,
  resultList,
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
      {articleList?.map((article) => (
        <StyledArticleListCard
          key={article.id}
          thumbnailUrl={article.thumbnailUrl}
          title={article.title}
          viewCount={article.viewCount}
          pressName={article.pressName}
          id={article.id}
          width="calc(50% - 4px)"
        />
      ))}
      {resultList?.map((result) =>
        result.type === 'press' ? (
          <FullWidthPressCard
            key={`press-${result.id}`}
            id={result.id}
            name={result.name}
            imageUrl={result.imageUrl}
            isSubscribed={result.isSubscribed}
            description={result.description}
            subscribeCount={result.subscribeCount}
          />
        ) : (
          <StyledArticleListCard
            key={`article-${result.id}`}
            thumbnailUrl={result.thumbnailUrl}
            title={result.title}
            viewCount={result.viewCount}
            pressName={result.pressName}
            id={result.id}
            width="calc(50% - 4px)"
          />
        ),
      )}
      <LoadingContainer ref={observerRef}>
        {isFetchingNextPage && <Spinner height={'24px'} />}
      </LoadingContainer>
    </Container>
  );
}

export default ArticleListCardGroup;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FullWidthPressCard = styled(PressCard)`
  flex: 1 1 100%;
`;

const StyledArticleListCard = styled(ArticleListCard)`
  flex: 1 1 calc(50%);
  flex-shrink: 0;
`;

const LoadingContainer = styled.div`
  display: flex;
  padding: 10px 0;
  width: 100%;
  height: 70px;
  align-self: center;
  justify-content: center;
`;
