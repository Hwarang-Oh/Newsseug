import PressCard from 'components/search/PressCard';
import CategoryFilter from 'components/common/CategoryFilter';
import SubLayout from 'components/common/SubLayout';
import InputSection from 'components/search/InputSection';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';

function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword: string = searchParams.get('keyword') ?? '';
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  return (
    <SubLayout isSearch={true}>
      <InputSection keywordText={keyword} />
      <>
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        {/* {article.targetArticles.map((item, idx) => {
          if (Array.isArray(item)) {
            return <ArticleListCardGroup key={idx} articleList={item} />;
          } else if (typeof item === 'object' && item != null) {
            return <PressCard key={idx} />;
          }
        })} */}
      </>
    </SubLayout>
  );
}

export default SearchResult;
