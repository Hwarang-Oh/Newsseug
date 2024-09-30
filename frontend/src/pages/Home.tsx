import Section from 'components/home/Section';
import MainLayout from 'components/common/MainLayout';
import useAutoLogin from 'hooks/useAutoLogin';
import useContentsFetch from 'hooks/useContentsFetch';
import styled, { keyframes } from 'styled-components';
import { fetchTodayArticlesByPage } from 'apis/articleApi';
/**
 * IMP : useAutoLogin() : 외부 Login을 수행하는 Custom Hook
 * @returns
 */

function Home() {
  useAutoLogin();
  const {
    allData,
    fetchNextPage: fetchNextTodayPage,
    hasNextPage: hasNextTodayPage,
    isFetchingNextPage: isFetchingNextTodayPage,
  } = useContentsFetch(fetchTodayArticlesByPage, ['todayArticles']);

  return (
    <MainLayout>
      <FadeInWrapper>
        <Section
          subTitle="오늘의 기사"
          moreLink={'/allArticles'}
          articleList={allData}
          fetchNextPage={fetchNextTodayPage}
          hasNextPage={hasNextTodayPage}
          isFetchingNextPage={isFetchingNextTodayPage}
        />
        {hasNextTodayPage && (
          <button onClick={() => fetchNextTodayPage()}>
            Load More Today's Articles
          </button>
        )}
      </FadeInWrapper>
    </MainLayout>
  );
}

export default Home;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const FadeInWrapper = styled.div`
  animation: ${fadeIn} 0.8s ease-in-out;
`;
