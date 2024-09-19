import SubLayout from 'components/common/SubLayout';
import CategoryFilter from 'components/common/CategoryFilter';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import { AllArticlesProps } from '@/types/allArticles';
import { useState } from 'react';

/**
 * IMP : All Articles Page -> Home Page를 통해서 들어올 수 있는 Page
 * IMP : ( 사용법 )  <AllArticles pageTitle={data.todyNews[0].subTitle} articleList={data.todyNews[0].ArticleList} />
 * @param param0
 * @returns
 */
function AllArticles({ pageTitle, articleList }: Readonly<AllArticlesProps>) {
  const [activeCategory, setActiveCategory] = useState('전체');
  return (
    <SubLayout>
      <div>{pageTitle}</div>
      <div>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <ArticleListCardGroup articleList={articleList ?? []} />
      </div>
    </SubLayout>
  );
}

export default AllArticles;
