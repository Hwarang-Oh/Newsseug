import styled from 'styled-components';
import ArticleListCard from 'components/common/ArticleListCard';
import { ArticleSlideBoxProps } from 'types/props/home';

/**
 * IMP : ArticleSlideBox Component ( Article Slide Box ) => 가로 슬라이드로 넘어가는 뉴스 기사
 * Type : articleList ( Article[] )
 * @param param0
 * @returns
 */
function ArticleSlideBox({ articleList }: Readonly<ArticleSlideBoxProps>) {
  return (
    <ArticleSlideBoxStyle>
      {articleList?.map((article, index) => (
        <ArticleListCard key={index} {...article} />
      ))}
    </ArticleSlideBoxStyle>
  );
}
export default ArticleSlideBox;

const ArticleSlideBoxStyle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding-bottom: 24px;
  overflow-x: auto;
  & > * {
    flex-shrink: 0;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
