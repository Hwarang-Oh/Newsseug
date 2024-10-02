import SubLayout from 'components/common/SubLayout';
import CategoryFilter from 'components/common/CategoryFilter';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchArticles } from 'apis/articleApi';
import {
  SectionTypeMatch,
  SectionState,
  PageType,
  Category,
} from 'types/api/article';
import useContentsFetch from 'hooks/useContentsFetch';

/**
 * IMP : All Articles Page -> Home Page를 통해서 들어올 수 있는 Page
 * IMP : ( 사용법 )  <AllArticles pageTitle={data.todyNews[0].subTitle} articleList={data.todyNews[0].ArticleList} />
 * TODO : articleList를 직접 불러와야 함.
 * @param param0
 * @returns
 */
function AllArticles() {
  const location = useLocation();
  const sectionState: SectionState = location.state;
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  const { articleList, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useContentsFetch<PageType>(
      sectionState.sectionType,
      [
        sectionState.queryKey[0],
        Category[activeCategory as keyof typeof Category],
      ],
      fetchArticles,
      activeCategory as Category,
    );

  return (
    <SubLayout>
      <div>{SectionTypeMatch[sectionState.sectionType]}</div>
      <FadeInWrapper>
        <div>
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <ArticleListCardGroup
            articleList={articleList || []}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </FadeInWrapper>
    </SubLayout>
  );
}

export default AllArticles;

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
