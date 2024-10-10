import Section from 'components/home/Section';
import MainLayout from 'components/common/MainLayout';
import useAutoLogin from 'hooks/useAutoLogin';
import useContentsFetch from 'hooks/useContentsFetch';
import styled, { keyframes } from 'styled-components';
import { Category, SectionType, SectionTypeMatch } from 'types/api/article';
import { useNavigate } from 'react-router-dom';
import {
  fetchArticles,
  fetchArticlesByToday,
  fetchArticlesByAge,
} from 'apis/articleApi';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/index';

function Home() {
  useAutoLogin();
  const navigate = useNavigate();
  let memberAge =
    useSelector((state: RootState) => state.member.member.age) ?? 20;
  const getAgeGroup = (age: number) => {
    return Math.floor(age / 10) * 10; // 10 단위로 내림
  };

  const sections = [
    useContentsFetch({
      queryKey: ['todayArticles', 'ALL'],
      fetchData: fetchArticlesByToday,
      sectionType: 'today',
      category: 'ALL' as Category,
    }),
    useContentsFetch({
      queryKey: ['ageArticles'],
      fetchData: fetchArticlesByAge,
      sectionType: 'age',
    }),
    useContentsFetch({
      queryKey: ['allArticles', 'ALL'],
      fetchData: fetchArticles,
      sectionType: 'all',
      category: 'ALL' as Category,
    }),
  ];
  return (
    <MainLayout>
      <FadeInWrapper>
        {sections.map((section) => (
          <Section
            key={section.sectionType}
            subTitle={
              section.sectionType === 'age'
                ? `${getAgeGroup(memberAge)}대 추천 기사`
                : SectionTypeMatch[section.sectionType as SectionType]
            }
            moreLink={() =>
              navigate(`/articles/section/${section.sectionType}`, {
                state: {
                  sectionType: section.sectionType,
                  queryKey: section.queryKey,
                  articleList: section.articleList,
                  sliceDetails: section.sliceDetails,
                },
              })
            }
            articleList={section.articleList}
            fetchNextPage={section.fetchNextPage}
            hasNextPage={section.hasNextPage}
            isFetchingNextPage={section.isFetchingNextPage}
            isLoading={section.isLoading}
            sectionType={section.sectionType}
            sliceDetails={section.sliceDetails}
            isError={section.isError}
          />
        ))}
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
