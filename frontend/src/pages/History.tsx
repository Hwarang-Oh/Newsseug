import SubLayout from 'components/common/SubLayout';
import article from 'db/article.json';

function History() {
  return (
    <SubLayout>
      <span>내 시청 기록</span>
      <ArticleListCardGroup articleList={article.articles} />
    </SubLayout>
  );
}

export default History;
