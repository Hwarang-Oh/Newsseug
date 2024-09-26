import styled from 'styled-components';
import ArticleListCard from 'components/common/ArticleListCard';
import { ArticleListCardGroupProps } from 'types/common/common';

/**
 * IMP : ArticleListCardGroup ( News Card Group ) Component
 * TYPE : articleList -> data.json에서 가져와야 한다. ( import data from '@/db/data.json';)
 * @param param0
 * @returns
 */
function ArticleListCardGroup({
  articleList,
}: Readonly<ArticleListCardGroupProps>) {
  return (
    <Container>
      {articleList.map((article) => (
        <ArticleListCard
          key={article.id}
          thumbnailUrl={article.thumbnailUrl}
          title={article.title}
          viewCount={article.viewCount}
          pressName={article.pressName}
          id={article.id}
          createdAt={article.createdAt}
          width="100%"
        />
      ))}
    </Container>
  );
}

export default ArticleListCardGroup;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;
