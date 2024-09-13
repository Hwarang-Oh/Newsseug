import MainLayout from 'components/common/MainLayout';
import Section from 'components/home/Section';
import data from 'db/data.json';

/**
 * IMP : Home Page
 * @returns
 */
function Home() {
  return (
    <MainLayout>
      {data.todyNews.map((data, index) => (
        <Section
          key={index}
          subTitle={data.subTitle}
          articleList={data.ArticleList}
        />
      ))}
    </MainLayout>
  );
}

export default Home;
