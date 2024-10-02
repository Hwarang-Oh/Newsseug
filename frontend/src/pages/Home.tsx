import Section from 'components/home/Section';
import MainLayout from 'components/common/MainLayout';
import useAutoLogin from 'hooks/useAutoLogin';
import useContentsFetch from 'hooks/useContentsFetch';
import styled, { keyframes } from 'styled-components';
import { Category, SectionType, SectionTypeMatch } from 'types/api/article';
import { useNavigate } from 'react-router-dom';
import { fetchArticles, fetchArticlesByToday } from 'apis/articleApi';

function Home() {
  const navigate = useNavigate();
  useAutoLogin();
  const sections = [
    useContentsFetch({
      queryKey: ['todayArticles', 'ALL'],
      fetchData: fetchArticlesByToday,
      sectionType: 'today',
      category: 'ALL' as Category,
    }),
    useContentsFetch({
      queryKey: ['ageArticles', 'ALL'],
      fetchData: fetchArticlesByToday,
      sectionType: 'age',
      category: 'ALL' as Category,
    }),
    useContentsFetch({
      queryKey: ['AllArticles', 'ALL'],
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
            subTitle={SectionTypeMatch[section.sectionType as SectionType]}
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
