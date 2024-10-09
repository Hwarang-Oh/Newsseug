import ArticleListCard from 'components/common/ArticleListCard';
import styled, { keyframes } from 'styled-components';
import { useRef, useEffect } from 'react';
import { ArticleListCardGroupProps } from 'types/common/common';
import { useDispatch } from 'react-redux';
import StoreArticleDispatch from 'hooks/useStoreArticleDispatch';

/**
 * IMP : ArticleSlideBox Component ( Article Slide Box ) => 가로 슬라이드로 넘어가는 뉴스 기사
 * @param param0
 * @returns
 */
function ArticleSlideBox({
  articleList,
  resultList,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  sectionType,
  sliceDetails,
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

  const dispatch = useDispatch();

  const articleDispatch = () => {
    StoreArticleDispatch(
      dispatch,
      articleList || [],
      sliceDetails ?? {},
      sectionType ?? 'all',
      'ALL',
    );
  };

  return (
    <ArticleSlideBoxStyle ref={slideBoxRef} onClick={() => articleDispatch()}>
      {articleList?.map((article) => (
        <ArticleListCard key={article.id} {...article} />
      ))}
      <LoadingContainer ref={observerRef}>
        {isFetchingNextPage && <LoadingIndicator></LoadingIndicator>}
      </LoadingContainer>
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

const LoadingContainer = styled.div`
  align-self: center;
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
