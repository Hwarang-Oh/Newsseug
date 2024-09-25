import MainLayout from 'components/common/MainLayout';
import Section from 'components/home/Section';
import { useEffect, useState } from 'react';
import { ArticleListCardProps } from 'types/common/common';
import { Article } from 'types/api/article';
import {
  fetchAllArticles,
  fetchArticlesByAge,
  fetchArticlesByToday,
} from 'apis/articleApi';
import { useLocation, useNavigate } from 'react-router-dom';
import useAutoLogin from 'hooks/useAutoLogin';
/**
 * IMP : Home Page
 * TODO : Home Page의 Section에서 '더보기'를 누르면 All Articles Page로 이동하도록 구현
 * @returns
 */
function Home() {
  useAutoLogin();
  const articleListTransform = (article: Article[]): ArticleListCardProps[] => {
    return article.map((item: any) => ({
      imgUrl: item.thumbnailUrl,
      title: item.title,
      viewCount: item.viewCount,
      pressName: item.pressName,
    }));
  };
  const [articleLists, setArticleLists] = useState<ArticleListCardProps[][]>(
    [],
  );
  useEffect(() => {
    // TODO : Home 화면 Page가 뜨면 해야할 행동 -> Member 정보 Fetch, Article 정보 Fetch
    // TODO : Member 정보를 가져오면 -> Member Slice에 넣어야 한다.
    // TODO : 자동화 해야 한다.

    const loadAllArticles = async () => {
      try {
        // 3개의 비동기 데이터를 동시에 가져오기
        const [data1, data2, data3] = await Promise.all([
          fetchArticlesByToday(),
          fetchArticlesByAge(20),
          fetchAllArticles(),
        ]);

        // 데이터를 변환하고 상태로 업데이트
        setArticleLists([
          articleListTransform(data1),
          articleListTransform(data2),
          articleListTransform(data3),
        ]);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    loadAllArticles();
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  return (
    <MainLayout>
      <Section
        subTitle="오늘의 뉴스"
        moreLink={`/todayNews/allArticles`}
        articleList={articleLists[0]} // 첫 번째 데이터 리스트
      />
      <Section
        subTitle="20대 관심 기사"
        moreLink={'/20Article/allArticles'}
        articleList={articleLists[1]} // 두 번째 데이터 리스트
      />
      <Section
        subTitle="전체 기사"
        moreLink={'/allArticles'}
        articleList={articleLists[2]} // 세 번째 데이터 리스트
      />
    </MainLayout>
  );
}

export default Home;
