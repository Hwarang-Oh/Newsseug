import SubLayout from 'components/common/SubLayout';
import CategoryFilter from 'components/common/CategoryFilter';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAPIFunctionBySectionType } from 'utils/getFetchContentsFunction';
import {
  SectionTypeMatch,
  SectionState,
  PageType,
  Category,
} from 'types/api/article';
import useContentsFetch from 'hooks/useContentsFetch';
import Spinner from 'components/common/Spinner';
import ErrorSection from 'components/common/ErrorSection';

/**
 * IMP : All Articles Page -> Home Page를 통해서 들어올 수 있는 Page
 * IMP : ( 사용법 )  <AllArticles pageTitle={data.todyNews[0].subTitle} articleList={data.todyNews[0].ArticleList} />
 * @param param0
 * @returns
 */
function AllArticles() {
  const location = useLocation();
  const sectionState: SectionState = location.state;
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  const {
    articleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    sliceDetails,
    isLoading,
    isError,
  } = useContentsFetch<PageType>({
    queryKey: [
      sectionState.queryKey[0],
      Category[activeCategory as keyof typeof Category],
    ],
    fetchData: getAPIFunctionBySectionType(sectionState.sectionType),
    sectionType: sectionState.sectionType,
    category: Category[activeCategory as keyof typeof Category],
  });
  return (
    <SubLayout>
      <div>{SectionTypeMatch[sectionState.sectionType]}</div>
      <FadeInWrapper>
        <StickyWrapper>
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </StickyWrapper>
        {isLoading && <Spinner height="200px" />}
        {isError && (
          <ErrorSection
            height="200px"
            text={`${SectionTypeMatch[sectionState.sectionType]}를 불러오는 데 실패했어요...😥`}
          />
        )}
        {articleList.length > 0 ? (
          <ArticleListCardGroup
            articleList={articleList || []}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            sliceDetails={sliceDetails}
            articleFrom={sectionState.sectionType}
            activeCategory={activeCategory}
          />
        ) : (
          <ErrorSection
            height="200px"
            text={`${SectionTypeMatch[sectionState.sectionType]}의 ${activeCategory} 카테고리 기사가 아직 없어요...😥`}
          />
        )}
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

const StickyWrapper = styled.div`
  position: sticky;
  top: 48px;
  z-index: 10;
  overflow-x: auto;
`;
