import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getMemberHistoryList } from 'apis/memberApi';
import ArticleListCard from '../common/ArticleListCard';
import { PageType } from '@/types/api/article';
import { ArticleListCardProps } from 'types/common/common';
import StoreArticleDispatch from 'hooks/useStoreArticleDispatch';
import ErrorSection from '../common/ErrorSection';
import Spinner from '../common/Spinner';
import { useDispatch } from 'react-redux';

function Histories() {
  const width = '120px';
  const height = '160px';

  const {
    data: myPageHistory,
    isLoading,
    error,
  } = useQuery<PageType>(['myPageHistory'], () =>
    getMemberHistoryList({ page: 1 }),
  );
  const articles = myPageHistory?.content || [];
  const sliceDetails = myPageHistory?.sliceDetails || {};

  const dispatch = useDispatch();
  const articleDispatch = () => {
    StoreArticleDispatch(dispatch, articles, sliceDetails, 'history');
  };

  if (isLoading) {
    return <Spinner height={height} />;
  }

  if (error) {
    return (
      <ErrorSection
        height={height}
        text="시청 기록을 불러오는 데 실패했어요.😥"
      />
    );
  }

  return (
    <Wrapper onClick={() => articleDispatch()}>
      {myPageHistory?.content ? (
        Array.isArray(myPageHistory?.content) &&
        myPageHistory.content.map((history: ArticleListCardProps) => {
          return (
            <ArticleListCard
              key={history.id}
              thumbnailUrl={history.thumbnailUrl}
              title={history.title}
              viewCount={history.viewCount}
              pressName={history.pressName}
              id={history.id}
              width={width}
              height={height}
            />
          );
        })
      ) : (
        <ErrorSection height={height} text="시청 기록이 없습니다." />
      )}
    </Wrapper>
  );
}

export default Histories;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 5px;
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
