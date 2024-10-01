import Section from 'components/home/Section';
import MainLayout from 'components/common/MainLayout';
import useAutoLogin from 'hooks/useAutoLogin';
import useContentsFetch from 'hooks/useContentsFetch';
import styled, { keyframes } from 'styled-components';
import { SectionType, SectionTypeMatch } from 'types/api/article';
import { useNavigate } from 'react-router-dom';
import { fetchArticles, fetchArticlesByToday } from 'apis/articleApi';
/**
 * IMP : useAutoLogin() : 외부 Login을 수행하는 Custom Hook
 * @returns
 */

function Home() {
  const navigate = useNavigate();
  useAutoLogin();
  const sections = [
    useContentsFetch('today', fetchArticlesByToday, 'todayArticles'),
    useContentsFetch('age', fetchArticlesByToday, 'ageArticles'),
    useContentsFetch('all', fetchArticles, 'allArticles'),
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
                  articleList: section.articleList,
                  sliceDetails: section.sliceDetails,
                  sectionType: section.sectionType,
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
