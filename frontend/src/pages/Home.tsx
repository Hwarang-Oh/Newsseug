import MainLayout from 'components/common/MainLayout';
import Section from 'components/home/Section';
import { useEffect, useState } from 'react';
import { ArticleListCardProps } from 'types/common/common';
import { fetchArticles, fetchArticlesByCategory } from 'apis/articleApi';
import { Article } from 'types/api/article';

/**
 * IMP : Home Page
 * TODO : Home Page의 Section에서 '더보기'를 누르면 All Articles Page로 이동하도록 구현
 * @returns
 */
function Home() {
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
  ); // 각 데이터 리스트를 배열로 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    const loadAllArticles = async () => {
      try {
        // 3개의 비동기 데이터를 동시에 가져오기
        const [data1, data2, data3] = await Promise.all([
          fetchArticlesByCategory('오늘의 뉴스'),
          fetchArticlesByCategory('20대 관심 기사'),
          fetchArticles(),
        ]);

        // 데이터를 변환하고 상태로 업데이트
        setArticleLists([
          articleListTransform(data1),
          articleListTransform(data2),
          articleListTransform(data3),
        ]);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    loadAllArticles();
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 보여줄 컴포넌트
  }

  return (
    <MainLayout>
      <Section
        subTitle="오늘의 뉴스"
        moreLink={'/'}
        articleList={articleLists[0]} // 첫 번째 데이터 리스트
      />
      <Section
        subTitle="20대 관심 기사"
        moreLink={'/'}
        articleList={articleLists[1]} // 두 번째 데이터 리스트
      />
      <Section
        subTitle="전체 기사"
        moreLink={'/'}
        articleList={articleLists[2]} // 세 번째 데이터 리스트
      />
    </MainLayout>
  );
}

export default Home;
