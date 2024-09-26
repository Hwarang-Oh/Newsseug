import styled from 'styled-components';
import SubTitle from '../mypage/SubTitle';
import ArticleListCardGroup from 'components/common/ArticleListCardGroup';
import article from 'db/article.json';

function PressArticles() {
  return (
    <Wrapper>
      <SubTitle title="업로드한 영상" />
      <ArticleListCardGroup articleList={article.articles} />
    </Wrapper>
  );
}

export default PressArticles;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 16px;
`;
